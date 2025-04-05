import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto, UpdateProjectDto } from './project.dto';
import { ResearchGroupService } from '@/research-group/research-group.service';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly researchGroupService: ResearchGroupService,
  ) {}

  @Get('/all')
  findAll() {
    return this.projectService.findAll();
  }

  @Get('/available')
  findAvailable() {
    return this.projectService.findAvailable();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  findMyProjects(@Request() req: { user: { userId: string } }) {
    return this.projectService.findMyProjects(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/group/:id')
  findByGroup(@Param('id') id: string) {
    return this.projectService.findByGroup(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() project: ProjectDto) {
    const researchGroup = await this.researchGroupService.findOne(
      project.researchGroupId,
    );

    if (!researchGroup) {
      throw new NotFoundException('Grupo de Pesquisa não existe');
    }

    return this.projectService.create(project);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() project: UpdateProjectDto) {
    return this.projectService.update(id, project);
  }
}
