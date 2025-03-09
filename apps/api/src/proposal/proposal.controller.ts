/* import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalDto } from './proposal.dto';
import { ResearchGroupService } from '@/research-group/research-group.service';

//TODO colocar os useGuard
@Controller('proposal')
export class ProposalController {
  constructor(
    private readonly proposalService: ProposalService,
    private readonly researchGroupService: ResearchGroupService,
  ) {}


  @Get('/my')
  findOne() {
    return this.proposalService.findAllMy();
  }

  @Patch(':id/cancel')
  patch(@Param('id') id: string) {
    return this.proposalService.refuse(id);
  }
}
 */