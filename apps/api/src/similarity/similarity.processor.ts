import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Worker } from 'bullmq';
import { SimilarityService } from './similarity.service';
import { getRedisConnection } from '@/config/redis.config';

@Injectable()
export class SimilarityProcessor implements OnModuleInit, OnModuleDestroy {
  private worker: Worker;

  constructor(private readonly similarityService: SimilarityService) {}

  onModuleInit() {
    this.worker = new Worker(
      'similarity_queue',
      async (job) => {
        if (job.name === 'group') {
          const { groupId } = job.data;
          const result =
            await this.similarityService.compareGroupWithAllDemands(groupId);
          console.log(`Resultado da similaridade do grupo ${groupId}`, result);
        } else if (job.name === 'demand') {
          const { demandId } = job.data;
          const result =
            await this.similarityService.compareDemandWithAllGroups(demandId);
          console.log(
            `Resultado da similaridade da demanda ${demandId}`,
            result,
          );
        }
      },
      {
        connection: getRedisConnection(),
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
