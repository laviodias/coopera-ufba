import { Module } from '@nestjs/common';
import { KnowledgeAreaService } from './knowledge-area.service';
import { KnowledgeAreaController } from './knowledge-area.controller';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  controllers: [KnowledgeAreaController],
  providers: [KnowledgeAreaService, PrismaService],
  exports: [KnowledgeAreaService],
})
export class KnowledgeAreasModule {}
