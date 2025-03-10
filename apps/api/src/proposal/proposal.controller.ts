import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalDto } from './proposal.dto';
import { JwtAuthGuard } from '@/auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('proposal')
export class ProposalController {
  constructor(
    private readonly proposalService: ProposalService,
  ) {}

  @Post()
  create(@Body() proposal: ProposalDto, @Request() req: { user: { userId: string } }) {
    return this.proposalService.create(proposal, req.user.userId);
  }

  @Get('/my')
  findAllMine(@Request() req: { user: { userId: string } }) {
    return this.proposalService.findAllMine(req.user.userId);
  }

  @Patch(':id/refuse')
  patch(@Param('id') id: string, @Request() req: { user: { userId: string } }) {
    return this.proposalService.refuse(id, req.user.userId);
  }

  @Patch(':id/accept')
  accept(@Param('id') id: string, @Request() req: { user: { userId: string } }) {
    return this.proposalService.accept(id, req.user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: { user: { userId: string } }) {
    return this.proposalService.delete(id, req.user.userId);
  }
}
