import { BullModule } from '@nestjs/bullmq';
import { SimilarityService } from './similarity.service';
import { SimilarityProcessor } from './similarity.processor';
import { ProjectModule } from '../project/project.module';
import { DemandModule } from '../demand/demand.module';
import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { SimilarityController } from './similarity.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'similarity',
      connection: {
        host: process.env.REDISHOST || 'redis_marketplace',
        port: parseInt(process.env.REDISPORT || '6379'),
        password: process.env.REDISPASSWORD || undefined
      },
    }),
    forwardRef(() => ProjectModule),
    forwardRef(() => DemandModule),
  ],
  providers: [SimilarityService, SimilarityProcessor, PrismaService],
  controllers: [SimilarityController],
  exports: [BullModule],
})
export class SimilarityModule {}
