import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ResearchGroupService } from './research-group.service';
import {
  CreateResearchGroupDto,
  UpdateResearchGroupDto,
} from './research-group.dto';
import { ResearchersService } from '@/researchers/researchers.service';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { IsGroupLeaderGuard } from './guards/is-group-leader.guard';

@Controller('researchgroup')
export class ResearchGroupController {
  constructor(
    private readonly researchGroupsService: ResearchGroupService,
    private readonly researcherService: ResearchersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() researchGroup: CreateResearchGroupDto,
    @Request() req: { user: { userId: string } },
  ) {
    //TODO Verificar se um líder de projeto existe e se é um Pesquisador

    if (researchGroup.img) {
      researchGroup.img = `/uploads/${researchGroup.img}`;
    }

    const researcher = await this.researcherService.findOne(
      req.user.userId,
      false,
    );

    if (!researcher) {
      throw new NotFoundException(
        'Apenas pesquisadores podem criar um grupo de pesquisa.',
      );
    }

    return this.researchGroupsService.create(researchGroup, researcher.id);
  }

  @Get('/all')
  findAll() {
    return this.researchGroupsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('members') members?: boolean,
    @Query('projects') projects?: boolean,
  ) {
    if (members && projects) {
      return this.researchGroupsService.findOneComplete(id);
    }
    if (members) {
      return this.researchGroupsService.findOneWithMembers(id);
    }
    if (projects) {
      return this.researchGroupsService.findOneWithProjects(id);
    }
    return this.researchGroupsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, IsGroupLeaderGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() researchGroup: UpdateResearchGroupDto,
  ) {
    //TODO ampliar regras de validação
    return this.researchGroupsService.update(id, researchGroup);
  }

  @UseGuards(JwtAuthGuard, IsGroupLeaderGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.researchGroupsService.delete(id);
  }

  @Post('search')
  search(@Query('data') query: string) {
    return this.researchGroupsService.search(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/members')
  findMembers(@Param('id') id: string) {
    return this.researchGroupsService.findMembers(id);
  }

  @UseGuards(JwtAuthGuard, IsGroupLeaderGuard)
  @Delete('/:id/members/:memberId')
  removeMember(@Param('id') id: string, @Param('memberId') memberId: string) {
    return this.researchGroupsService.removeMember(id, memberId);
  }

  @UseGuards(JwtAuthGuard, IsGroupLeaderGuard)
  @Post('/:id/members/:userEmail')
  addMember(@Param('id') id: string, @Param('userEmail') userEmail: string) {
    return this.researchGroupsService.addMember(id, userEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/send-email')
  sendEmail(
    @Body()
    body: {
      message: string;
      demandName: string;
      researchGroupId: string;
      companyName: string;
    },
  ) {
    return this.researchGroupsService.sendEmail(
      body.message,
      body.demandName,
      body.researchGroupId,
      body.companyName,
    );
  }
}
