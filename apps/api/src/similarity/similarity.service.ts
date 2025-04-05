import { Injectable } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { DemandService } from '../demand/demand.service';
import * as stringSimilarity from 'string-similarity';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class SimilarityService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly demandService: DemandService,
    @InjectQueue('similarity')
    private readonly queue: Queue,
  ) {}

  async enqueueProject(projectId: string) {
    await this.queue.add('project', { projectId });
  }

  async enqueueDemand(demandId: string) {
    await this.queue.add('demand', { demandId });
  }

  async compareProjectWithAllDemands(projectId: string) {
    const project = await this.projectService.findOne(projectId);
    const demands = await this.demandService.all();

    const matches = demands.map((demand) => {
      const similarity = stringSimilarity.compareTwoStrings(
        project.description,
        demand.description,
      );
      return {
        demandId: demand.id,
        similarity: similarity,
      };
    });

    return matches.sort((a, b) => b.similarity - a.similarity);
  }

  async compareDemandWithAllProjects(demandId: string) {
    const demand = await this.demandService.findOne(demandId);
    const projects = await this.projectService.findAll();

    const matches = projects.map((project) => {
      const similarity = stringSimilarity.compareTwoStrings(
        demand.description,
        project.description,
      );
      return {
        projectId: project.id,
        similarity: similarity,
      };
    });

    return matches.sort((a, b) => b.similarity - a.similarity);
  }
}
