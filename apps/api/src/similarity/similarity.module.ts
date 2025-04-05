import { BullModule } from '@nestjs/bullmq';
import { SimilarityService } from './similarity.service';
import { SimilarityProcessor } from './similarity.processor';
import { ProjectModule } from '../project/project.module';
import { DemandModule } from '../demand/demand.module';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'similarity',
      connection: {
        host: 'redis_marketplace',
        port: 6379,
      },
    }),
    forwardRef(() => ProjectModule),
    forwardRef(() => DemandModule),
  ],
  providers: [SimilarityService, SimilarityProcessor],
  exports: [BullModule],
})
export class SimilarityModule {}

