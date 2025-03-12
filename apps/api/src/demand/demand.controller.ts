import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  CreateDemandDTO,
  UpdateDemandDTO,
  SuggestDemandDTO,
} from './demand.dto';
import { DemandService } from '@/demand/demand.service';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { UserService } from '@/user/user.service';

@Controller('demand')
export class DemandController {
  constructor(
    private readonly demandService: DemandService,
    private readonly userService: UserService,
  ) {}

  @Get('/all')
  all() {
    return this.demandService.all();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  my(@Request() req: { user: { userId: string } }) {
    return this.demandService.my(req.user.userId);
  }

  @Get('/suggest')
  async suggest(
    @Query('query') query: string, 
    @Query('keywords') keywords?: string, 
    @Query('date') date?: string,
    @Query('company') company?: string
  ): Promise<SuggestDemandDTO[]> {
    return this.demandService.suggest(query, keywords || '', date || '', company || '');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/suggest-filter')
  async myFilter(
    @Query('query') query: string,
    @Request() req: { user: { userId: string } },
  ): Promise<SuggestDemandDTO[]> {
    if (!query || query.length < 3) {
      return [];
    }
    return this.demandService.suggestFilter(query, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/private/:id')
  findOnePrivate(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.demandService.findOneIncludingPrivate(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() demand: any,
    @Request() req: { user: { userId: string } },
  ) {
    const user = await this.userService.findOneWithCompany(req.user.userId);

    if (!user || !user.company) {
      throw new NotFoundException(
        'Usuário não existe ou não há empresa associada.',
      );
    }

    const companyId = user.company.userId;

    return this.demandService.create(demand, companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.demandService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patch(@Param('id') id: string, @Body() demand: UpdateDemandDTO) {
    return this.demandService.patch(id, demand);
  }
}
