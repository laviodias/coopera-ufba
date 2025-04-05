import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResearchGroupService } from '@/research-group/research-group.service';
import { MailModule } from '@/mailsend/mail.module';
import { SimilarityModule } from '@/similarity/similarity.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, ResearchGroupService],
  imports: [MailModule, forwardRef(() => SimilarityModule)],
  exports: [ProjectService],
})
export class ProjectModule {}
