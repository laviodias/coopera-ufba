import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { DemandService } from '../demand/demand.service';
import * as stringSimilarity from 'string-similarity';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { SimilarityMatchType } from '@prisma/client';

@Injectable()
export class SimilarityService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly projectService: ProjectService,
    private readonly demandService: DemandService,
    @InjectQueue('similarity')
    private readonly queue: Queue,
  ) {}

  async saveTopMatches(
    sourceType: SimilarityMatchType,
    sourceId: string,
    matches: { id: string; similarity: number; type: SimilarityMatchType }[],
  ) {
    const top3 = matches.slice(0, 3);

    await this.prismaService.similarityMatch.deleteMany({
      where: { sourceType, sourceId },
    });

    await this.prismaService.similarityMatch.createMany({
      data: top3.map((match) => ({
        sourceType,
        sourceId,
        targetType: match.type,
        targetId: match.id,
        score: match.similarity,
      })),
    });
  }

  async compareProjectWithAllDemands(projectId: string) {
    const project = await this.projectService.findOne(projectId);
    const demands = await this.demandService.all();

    const matches = demands.map((demand) => {
      const similarity = stringSimilarity.compareTwoStrings(
        project.description as string,
        demand.description as string,
      );
      return {
        id: demand.id,
        similarity: similarity,
        type: SimilarityMatchType.DEMAND,
      };
    });

    const sortedResults = matches.sort((a, b) => b.similarity - a.similarity);

    await this.saveTopMatches(
      SimilarityMatchType.PROJECT,
      projectId,
      sortedResults,
    );

    return sortedResults;
  }

  async compareDemandWithAllProjects(demandId: string) {
    const demand = await this.demandService.findOne(demandId);
    const projects = await this.projectService.findAll();

    const matches = projects.map((project) => {
      const similarity = stringSimilarity.compareTwoStrings(
        demand.description as string,
        project.description as string,
      );
      return {
        id: project.id,
        similarity: similarity,
        type: SimilarityMatchType.PROJECT,
      };
    });

    const sortedResults = matches.sort((a, b) => b.similarity - a.similarity);

    await this.saveTopMatches(
      SimilarityMatchType.DEMAND,
      demandId,
      sortedResults,
    );

    return sortedResults;
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
            ? await this.projectService.findOne(searchId)
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
