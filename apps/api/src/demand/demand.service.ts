import { PrismaService } from '@/infra/database/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDemandDTO, UpdateDemandDTO } from './demand.dto';
import { Demand, UserStatus } from '@prisma/client';
import { UserService } from '@/user/user.service';
import { SimilarityService } from '@/similarity/similarity.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class DemandService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    @InjectQueue('similarity') private similarityQueue: Queue,
  ) {}

  async create(demand: CreateDemandDTO, companyId: string): Promise<Demand> {
    const {
      name,
      description,
      link,
      keywords = [],
      projects = [],
      public: publicDemand,
    } = demand;
    const keywordsIds = keywords.map((k: any) => ({ id: k }));
    const projectsIds = projects.map((p: any) => ({ id: p }));

    const createdDemand = await this.prismaService.demand.create({
      data: {
        companyId: companyId,
        description: description,
        name: name,
        link: link,
        public: publicDemand,
        keywords: {
          connect: keywordsIds,
        },
        projects: {
          connect: projectsIds,
        },
      },
    });

    await this.similarityQueue.add('demand', {
      demandId: createdDemand.id,
    });

    return createdDemand;
  }

  async all(): Promise<Demand[]> {
    return (
      this.prismaService.demand.findMany({
        where: {
          public: true,
          status: {
            not: 'DELETED',
          },
        },
        include: {
          company: {
            include: {
              user: true,
            },
          },
          keywords: true,
        },
      }) || []
    );
  }

  async my(userId: string): Promise<Demand[]> {
    return (
      this.prismaService.demand.findMany({
        where: {
          companyId: userId,
          status: {
            not: 'DELETED',
          },
        },
        include: {
          company: {
            include: {
              user: true,
            },
          },
          keywords: true,
          projects: true,
        },
      }) || []
    );
  }

  async delete(id: string) {
    return this.prismaService.demand.update({
      where: { id },
      data: { status: 'DELETED' },
    });
  }

  async patch(id: string, demand: UpdateDemandDTO): Promise<Demand> {
    const { keywords = [], projects = [] } = demand;
    const keywordsIds = keywords.map((k) => ({ id: k }));
    const projectsIds = projects.map((p) => ({ id: p }));

    delete demand.keywords;

    const savedDemand = await this.prismaService.demand.findUniqueOrThrow({
      where: { id },
    });

    const updated = { ...savedDemand, ...demand };

    const demandUpdated = await this.prismaService.demand.update({
      where: { id },
      data: {
        ...updated,
        keywords: { set: [], connect: keywordsIds },
        projects: { set: [], connect: projectsIds },
      },
    });

    await this.similarityQueue.add('demand', {
      demandId: demandUpdated.id,
    });

    return demandUpdated;
  }

  async findOne(id: string): Promise<Demand> {
    const demand = await this.prismaService.demand.findUnique({
      where: {
        id,
        public: true,
      },
      include: {
        projects: true,
        company: {
          include: {
            user: true,
          },
        },
        keywords: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada');
    }

    return demand;
  }

  async findOneIncludingPrivate(id: string, userId: string): Promise<Demand> {
    const demand = await this.prismaService.demand.findUnique({
      where: { id },
      include: {
        company: {
          include: {
            user: true,
          },
        },
        keywords: true,
        projects: {
          include: {
            researchGroup: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada');
    }

    if (demand.public) {
      return demand;
    }

    const user = await this.userService.findOneWithProfiles(userId);

    if (user.researcher && user.status == UserStatus.APPROVED) {
      return demand;
    }

    if (demand?.company?.user?.id == userId) {
      return demand;
    }

    throw new ForbiddenException('Você não tem acesso a esta demanda');
  }

  async suggest(
    query: string,
    keywords: string,
    date: string,
    company: string,
  ): Promise<{ id: string; name: string; description: string }[]> {
    const filters: Record<string, unknown> = {};

    if (keywords && keywords.length > 0) {
      filters.keywords = {
        some: {
          id: {
            in: keywords.split(','),
          },
        },
      };
    }

    if (date && date.length > 0) {
      const today = new Date();
      const todayBegin = new Date(today.setHours(0, 0, 0, 0));
      const todayEnd = new Date(today.setHours(23, 59, 59, 999));
      switch (date) {
        case 'TODAY':
          filters.createdAt = {
            gte: new Date(todayBegin),
            lte: new Date(todayEnd),
          };
          break;
        case 'THIS_WEEK':
          const firstDayOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay()),
          );
          filters.createdAt = {
            gte: new Date(firstDayOfWeek.setHours(0, 0, 0, 0)),
            lte: new Date(todayEnd),
          };
          break;
        case 'LAST_TWO_WEEKS':
          const twoWeeksAgo = new Date(today.setDate(today.getDate() - 14));
          filters.createdAt = {
            gte: new Date(twoWeeksAgo.setHours(0, 0, 0, 0)),
            lte: new Date(todayEnd),
          };
          break;
        case 'THIS_MONTH':
          const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
          );
          filters.createdAt = {
            gte: new Date(firstDayOfMonth.setHours(0, 0, 0, 0)),
            lte: new Date(todayEnd),
          };
          break;
      }
    }

    if (company && company.length > 0) {
      filters.companyId = company;
    }

    return this.prismaService.demand.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          {
            keywords: {
              some: { name: { contains: query, mode: 'insensitive' } },
            },
          },
        ],
        ...filters,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        company: {
          include: {
            user: true,
          },
        },
        keywords: true,
      },
    });
  }

  async suggestFilter(
    query: string,
    userId: string,
  ): Promise<{ id: string; name: string; description: string }[]> {
    return this.prismaService.demand.findMany({
      where: {
        companyId: userId,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          {
            keywords: {
              some: { name: { contains: query, mode: 'insensitive' } },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        company: {
          include: {
            user: true,
          },
        },
        keywords: true,
      },
    });
  }
}
