import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProposalDto } from './proposal.dto';
import { Proposal, ProposalStatus } from '@prisma/client';

@Injectable()
export class ProposalService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(proposal: ProposalDto, senderId: string): Promise<Proposal> {
    const projectAlreadyExists = await this.prismaService.proposal.findFirst({
      where: {
        senderId,
        demandId: proposal.demandId,
        researchGroupId: proposal.researchGroupId,
      },
    });
    if (projectAlreadyExists)
      throw new ConflictException('Proposta já enviada!');

    return this.prismaService.proposal.create({
      data: {
        ...proposal,
        senderId,
        status: ProposalStatus.CREATED,
      },
    });
  }

  async findAllMine(userId: string) {
    return await this.prismaService.proposal.findMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
    });
  }

  async refuse(id: string, receiverId: string) {
    const proposal = await this.prismaService.proposal.findUnique({
      where: { id, receiverId },
    });

    if (!proposal) {
      throw new NotFoundException('Proposta não encontrada');
    }

    return await this.prismaService.proposal.update({
      where: { id },
      data: { status: ProposalStatus.REJECTED },
    });
  }

  async accept(id: string, receiverId: string) {
    const proposal = await this.prismaService.proposal.findUnique({
      where: { id, receiverId },
    });

    if (!proposal) {
      throw new NotFoundException('Proposta não encontrada');
    }

    return await this.prismaService.proposal.update({
      where: { id },
      data: { status: ProposalStatus.ACCEPTED },
    });
  }

  async delete(id: string, senderId: string) {
    return await this.prismaService.proposal.delete({
      where: { id, senderId },
    });
  }
}
