import { BullModule } from '@nestjs/bullmq';
import { SimilarityService } from './similarity.service';
import { SimilarityProcessor } from './similarity.processor';
import { DemandModule } from '../demand/demand.module';
import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { SimilarityController } from './similarity.controller';
import { getRedisConnection } from '@/config/redis.config';
import { ResearchGroupsModule } from '@/research-group/research-group.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'similarity_queue',
      connection: getRedisConnection(),
    }),
    forwardRef(() => ResearchGroupsModule),
    forwardRef(() => DemandModule),
  ],
  providers: [SimilarityService, SimilarityProcessor, PrismaService],
  controllers: [SimilarityController],
  exports: [SimilarityService, BullModule],
})
export class SimilarityModule {}
