import { Controller, Get, Param } from '@nestjs/common';
import { SimilarityService } from './similarity.service';
import { SimilarityMatchType } from '@prisma/client';

@Controller('similarity')
export class SimilarityController {
  constructor(private readonly similarityService: SimilarityService) {}

  @Get('matches/:id/:type')
  async getMatches(@Param('id') id: string, @Param('type') type: string) {
    return this.similarityService.getMatches(type as SimilarityMatchType, id);
  }
}
