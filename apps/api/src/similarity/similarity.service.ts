import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { DemandService } from '../demand/demand.service';
import * as stringSimilarity from 'string-similarity';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { SimilarityMatchType } from '@prisma/client';
import { ResearchGroupService } from '@/research-group/research-group.service';

@Injectable()
export class SimilarityService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly researchGroupService: ResearchGroupService,
    private readonly demandService: DemandService,
    @InjectQueue('similarity_queue') private readonly queue: Queue,
  ) {}

  async saveTopMatch(
    sourceType: SimilarityMatchType,
    sourceId: string,
    match: { id: string; similarity: number; type: SimilarityMatchType },
  ) {
    await this.prismaService.similarityMatch.deleteMany({
      where: { sourceType, sourceId },
    });

    let userId;
    if (match.type === SimilarityMatchType.RESEARCH_GROUP) {
      const group = await this.prismaService.researchGroup.findUnique({
        where: { id: match.id },
        include: {
          leader: { select: { userId: true } },
        },
      });
      userId = group?.leader?.userId || '';
    } else {
      const demand = await this.prismaService.demand.findUnique({
        where: { id: match.id },
        include: { company: { select: { userId: true } } },
      });
      userId = demand?.company?.userId || '';
    }

    console.log(
      `Enviando notificação para o usuário ${userId} sobre o match com ${match.id}`,
    );

    await this.prismaService.notification.create({
      data: {
        message:
          'Você tem uma nova oportunidade! Clique aqui para ver todas as suas oportunidades.',
        url: '/oportunidades',
        userId: userId,
      },
    });

    await this.prismaService.similarityMatch.create({
      data: {
        sourceType,
        sourceId,
        targetType: match.type,
        targetId: match.id,
        score: match.similarity,
      },
    });
  }

  async compareGroupWithAllDemands(groupId: string) {
    const group = await this.researchGroupService.findOne(groupId);
    const demands = await this.demandService.all();

    const matches = demands.map((demand) => {
      const similarity = stringSimilarity.compareTwoStrings(
        group.description as string,
        demand.description as string,
      );
      return {
        id: demand.id,
        similarity: similarity,
        type: SimilarityMatchType.DEMAND,
      };
    });

    const bestMatch = matches.sort((a, b) => b.similarity - a.similarity)[0];

    await this.saveTopMatch(
      SimilarityMatchType.RESEARCH_GROUP,
      groupId,
      bestMatch,
    );

    return matches;
  }

  async compareDemandWithAllGroups(demandId: string) {
    const demand = await this.demandService.findOne(demandId);
    const groups = await this.researchGroupService.findAll();

    const matches = groups.map((group) => {
      const similarity = stringSimilarity.compareTwoStrings(
        demand.description as string,
        group.description as string,
      );
      return {
        id: group.id,
        similarity: similarity,
        type: SimilarityMatchType.RESEARCH_GROUP,
      };
    });

    const bestMatch = matches.sort((a, b) => b.similarity - a.similarity)[0];

    await this.saveTopMatch(SimilarityMatchType.DEMAND, demandId, bestMatch);

    return matches;
  }

  async getMatches(type: SimilarityMatchType, id: string) {
    const matches = await this.prismaService.similarityMatch.findMany({
      where: {
        OR: [{ sourceId: id }, { targetId: id }],
      },
      orderBy: { score: 'desc' },
    });

    const enrichedMatches = await Promise.all(
      matches.map(async (match) => {
        const searchId =
          match.sourceId === id ? match.targetId : match.sourceId;
        const data =
          type === SimilarityMatchType.DEMAND
            ? await this.researchGroupService.findOne(searchId)
            : await this.demandService.findOne(searchId);

        return {
          ...match,
          target: data,
        };
      }),
    );

    return enrichedMatches;
  }
}
