import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKnowledgeAreaDto } from './knowledge-area.dto';
import { PrismaService } from '@/infra/database/prisma.service';

@Injectable()
export class KnowledgeAreaService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByText(text: string) {
    const knowledgeAreaList = await this.prismaService.knowledgeArea.findMany();
    return knowledgeAreaList.filter((knowledgeArea) =>
      knowledgeArea.name.toLowerCase().includes(text.toLowerCase()),
    );
  }

  async create(knowledgeArea: CreateKnowledgeAreaDto) {
    return this.prismaService.knowledgeArea.create({
      data: {
        name: knowledgeArea.name,
      },
    });
  }

  async findAll() {
    return this.prismaService.knowledgeArea.findMany();
  }

  async findOne(id: string) {
    const knowledgeArea = await this.prismaService.knowledgeArea.findUnique({
      where: {
        id: id,
      },
    });

    if (!knowledgeArea) throw new NotFoundException('KnowledgeArea não encontrada');

    return {
      id: knowledgeArea.id,
      name: knowledgeArea.name,
    };
  }

  async remove(id: string) {
    return this.prismaService.knowledgeArea.delete({
      where: {
        id: id,
      },
    });
  }
}
