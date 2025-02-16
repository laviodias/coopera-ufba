import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  my(@Request() req: { user: { userId: string } }) {
    return this.notificationsService.my(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/unseen-count')
  unseenCount(@Request() req: { user: { userId: string } }) {
    return this.notificationsService.unseenCount(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/send')
  send(@Body() body: { message: string; userId: string, url?: string }) {
    return this.notificationsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/read')
  read(@Body() body: { id: string }) {
    return this.notificationsService.markRead(body.id);
  }
}
