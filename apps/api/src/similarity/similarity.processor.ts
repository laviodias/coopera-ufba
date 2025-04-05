import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Worker } from 'bullmq';
import { SimilarityService } from './similarity.service';

@Injectable()
export class SimilarityProcessor implements OnModuleInit, OnModuleDestroy {
  private worker: Worker;

  constructor(private readonly similarityService: SimilarityService) {}

  onModuleInit() {
    this.worker = new Worker(
      'similarity',
      async (job) => {
        if (job.name === 'project') {
          const { projectId } = job.data;
          const result =
            await this.similarityService.compareProjectWithAllDemands(
              projectId,
            );
          console.log(
            `Resultado da similaridade do projeto ${projectId}`,
            result,
          );
        } else if (job.name === 'demand') {
          const { demandId } = job.data;
          const result =
            await this.similarityService.compareDemandWithAllProjects(demandId);
          console.log(
            `Resultado da similaridade da demanda ${demandId}`,
            result,
          );
        }
      },
      {
        connection: {
          host: process.env.REDIS_HOST || 'redis_marketplace',
          port: parseInt(process.env.REDIS_PORT || '6379'),
          password: process.env.REDIS_PASSWORD || undefined,
        },
      },
    );

    this.worker.on('failed', (job, err) => {
      if (!job) return;

      console.error(`Job ${job.name} failed:`, err);
    });

    this.worker.on('completed', (job) => {
      console.log(`Job ${job.name} completed successfully.`);
    });
  }

  async onModuleDestroy() {
    await this.worker?.close();
  }
}
