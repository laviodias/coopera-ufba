import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';


@Injectable()
export class NotificationsService {
  constructor(private prismaService: PrismaService) {}

  async my(userId: string): Promise<Notification[]> {
    return (
        this.prismaService.notification.findMany({
            where: {
            userId,
            },
        }) || []
    );
  }
}