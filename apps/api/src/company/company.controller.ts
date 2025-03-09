import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/send-email')
  sendEmail(
    @Body()
    body: {
      message: string;
      research_group: string;
      companyId: string;
    },
  ) {
    return this.companyService.sendEmail(
      body.message,
      body.research_group,
      body.companyId,
    );
  }

  @Get('/names')
  getAllNames() {
    return this.companyService.getAllNames().then((companies) => {
      return companies.map((company) => {
        return {
          id: company.user.id,
          name: company.user.name,
        };
      });
    })
  }
}
