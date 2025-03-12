import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateResearchGroupDto,
  UpdateResearchGroupDto,
} from './research-group.dto';
import { MailService } from '../mailsend/mail.service';

@Injectable()
export class ResearchGroupService {
  findAll() {
    return this.prismaService.researchGroup.findMany({
      include: {
        knowledgeAreas: true,
      },
    });
  }
  constructor(
    private readonly mailService: MailService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(group: CreateResearchGroupDto, researcherId: string) {
    console.log('aq', researcherId);
    const groupAlreadyExists =
      await this.prismaService.researchGroup.findUnique({
        where: {
          name: group.name,
        },
      });
    if (groupAlreadyExists)
      throw new ConflictException('Grupo de pesquisa já cadastrado');

    const memberId = group.members?.map((m) => ({ userId: m }));
    const knowledgeAreasId = group.knowledgeAreas?.map((k) => ({ id: k }));
    const createdGroup = await this.prismaService.researchGroup.create({
      data: {
        name: group.name,
        description: group.description,
        urlCNPQ: group.urlCNPQ,
        img: group.img,
        researcherId,
        members: {
          connect: memberId,
        },
        knowledgeAreas: {
          connect: knowledgeAreasId,
        },
      },
    });

    return {
      id: createdGroup.id,
      name: createdGroup.name,
      description: createdGroup.description,
      urlCNPQ: createdGroup.urlCNPQ,
      img: createdGroup.img,
      researcherId: createdGroup.researcherId,
    };
  }

  async findOne(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        leader: true,
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
      leader: group.leader,
    };
  }

  async findMembers(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return group.members;
  }

  async removeMember(id: string, userId: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    if (group.researcherId === userId)
      throw new ConflictException('Lider nao pode ser removido');

    return this.prismaService.researchGroup.update({
      where: {
        id,
      },
      data: {
        members: {
          disconnect: {
            userId,
          },
        },
      },
    });
  }

  async addMember(id: string, userEmail: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    const user = await this.prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        researcher: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário nao encontrado');
    if (!user.researcher)
      throw new NotFoundException('Usuário não é pesquisador');

    return this.prismaService.researchGroup.update({
      where: {
        id,
      },
      data: {
        members: {
          connect: {
            userId: user.id,
          },
        },
      },
    });
  }

  async findOneWithMembers(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        leader: true,
        members: true,
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
      leader: group.leader,
      members: group.members,
    };
  }

  async findOneWithProjects(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        leader: true,
        projects: {
          include: {
            demand: true,
          },
        },
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
      leader: group.leader,
      projects: group.projects,
    };
  }

  async findOneComplete(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        leader: true,
        projects: {
          include: {
            demand: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
      leader: group.leader,
      projects: group.projects,
      members: group.members,
    };
  }

  async update(id: string, group: UpdateResearchGroupDto) {
    const updatedGroup = await this.prismaService.researchGroup.update({
      where: {
        id: id,
      },
      data: {
        name: group.name,
        description: group.description,
        urlCNPQ: group.urlCNPQ,
        img: group.img,
        researcherId: group.researcherId,
      },
    });

    return {
      id: updatedGroup.id,
      name: updatedGroup.name,
      description: updatedGroup.description,
      urlCNPQ: updatedGroup.urlCNPQ,
      img: updatedGroup.img,
      researcherId: updatedGroup.researcherId,
    };
  }

  async delete(id: string) {
    const group = await this.prismaService.researchGroup.delete({
      where: {
        id: id,
      },
    });

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
    };
  }

  async findByName(name: string) {
    return await this.prismaService.researchGroup.findUnique({
      where: {
        name,
      },
    });
  }

  async search(query: string) {
    return await this.prismaService.researchGroup.findMany({
      include: {
        knowledgeAreas: true,
      },
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findAllKnowledgeAreas() {
    return await this.prismaService.knowledgeArea.findMany();
  }

  async sendEmail(
    message: string,
    demandName: string,
    researchGroupId: string,
    companyName: string,
  ) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id: researchGroupId,
      },
      select: {
        name: true,
        leader: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
    if (!group) {
      throw new NotFoundException('Grupo de pesquisa não encontrado');
    }

    this.mailService.sendTextEmail(
      group.leader.user.email,
      'Coopera UFBA - Nova mensagem',
      `Nova mensagem da empresa: <strong>${companyName}</strong>, sobre a demanda: <strong>${demandName}</strong>. <br> Mensagem: <br> ${message}`,
    );

    return 'Email sent';
  }
}
