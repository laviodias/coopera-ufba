import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';

@Module({
  controllers: [ProposalController],
  providers: [ProposalService, PrismaService],
  exports: [ProposalService],
})
export class ProposalModule {}
