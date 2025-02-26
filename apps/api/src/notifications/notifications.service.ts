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
        orderBy: {
          createdAt: 'desc',
        },
      }) || []
    );
  }

  async unseenCount(userId: string): Promise<number> {
    return (
      this.prismaService.notification.count({
        where: {
          userId,
          read: false,
        },
      }) || 0
    );
  }

  async markRead(id: string): Promise<Notification> {
    return this.prismaService.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });
  }

  async create(notification: Partial<Notification>): Promise<Notification> {
    return this.prismaService.notification.create({
      data: notification as Notification,
    });
  }
}
