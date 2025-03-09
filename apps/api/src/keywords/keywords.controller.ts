import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordsService.create(createKeywordDto);
  }

  @Get()
  findAll() {
    return this.keywordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsService.update(id, updateKeywordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keywordsService.remove(id);
  }

  @Get('search/:text')
  findByText(@Param('text') text: string) {
    return this.keywordsService.findByText(text);
  }
}
