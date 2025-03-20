import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { KnowledgeAreaService } from './knowledge-area.service';
import { CreateKnowledgeAreaDto } from './knowledge-area.dto';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('knowledgearea')
export class KnowledgeAreaController {
  constructor(private readonly knowledgeAreasService: KnowledgeAreaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createKnowledgeAreaDto: CreateKnowledgeAreaDto) {
    return this.knowledgeAreasService.create(createKnowledgeAreaDto);
  }

  @Get('all')
  findAll() {
    return this.knowledgeAreasService.findAll();
  }

  @Get('search/:text')
  findByText(@Param('text') text: string) {
    return this.knowledgeAreasService.findByText(text);
  }
}
