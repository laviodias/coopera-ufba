import { forwardRef, Module } from '@nestjs/common';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { UserService } from '@/user/user.service';
import { SimilarityModule } from '@/similarity/similarity.module';

@Module({
  imports: [forwardRef(() => SimilarityModule)],
  controllers: [DemandController],
  providers: [DemandService, PrismaService, UserService],
  exports: [DemandService],
})
export class DemandModule {}
