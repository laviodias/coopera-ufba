import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { UserService } from '@/user/user.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService, UserService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
