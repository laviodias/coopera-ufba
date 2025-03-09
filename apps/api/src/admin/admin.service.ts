import { getUserType } from '@/user/utils/user.types.util';
import { PrismaService } from '../infra/database/prisma.service';
import { UpdateUserDto } from '../user/user.dto';
import { Injectable } from '@nestjs/common';
import { ResearcherType, User } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        company: true,
        researcher: true,
      },
      orderBy: [
        {
          status: 'desc',
        },
      ],
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      utype: getUserType(user),
    }));
  }

  async editUser(userId: string, updateUserDto: UpdateUserDto) {
    const { role, status, utype } = updateUserDto;

    const data: Partial<User> = {
      role,
      status,
    };

    const response = await this.prismaService.user.update({
      where: { id: userId },
      data,
      include: {
        researcher: true,
      },
    });

    if (utype && role != 'ADMIN') {
      if (response.researcher) {
        return await this.prismaService.researcher.update({
          where: { userId },
          data: {
            researcherType: utype.split('_')[1] as ResearcherType,
          },
        });
      } else {
        return await this.prismaService.researcher.create({
          data: {
            userId,
            researcherType: utype.split('_')[1] as ResearcherType,
          },
        });
      }
    }

    return response;
  }

  async deleteUser(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  // Dashboard methods
  async getEntityCounts() {
    const researchers = await this.prismaService.researcher.count();
    const companies = await this.prismaService.company.count();
    const researchGroups = await this.prismaService.researchGroup.count();
    const demands = await this.prismaService.demand.count();

    return {
      companies,
      researchers,
      researchGroups,
      demands,
    };
  }

  async getDemandsByCompany() {
    return this.prismaService.demand.groupBy({
      by: ['companyId'],
      _count: {
        id: true,
      },
    });
  }

  async getDemandsByResearchGroup() {
    return await this.prismaService.researchGroup.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
  }
}
