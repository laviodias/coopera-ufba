import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UpdateUserDto } from '../user/user.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Patch('users/:id')
  editUser(@Param('id') id: string, @Body() updatedUserData: UpdateUserDto) {
    return this.adminService.editUser(id, updatedUserData);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Get('dashboard/entity-counts')
  getEntityCounts() {
    return this.adminService.getEntityCounts();
  }

  @Get('dashboard/demands-by-company')
  getDemandsByCompany() {
    return this.adminService.getDemandsByCompany();
  }

  @Get('dashboard/demands-by-research-group')
  getDemandsByResearchGroup() {
    return this.adminService.getDemandsByResearchGroup();
  }
}
