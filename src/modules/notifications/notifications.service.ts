import { Injectable } from '@nestjs/common';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [];
  private currentId = 1;

  create(dto: CreateNotificationDto): Notification {
    const notification: Notification = {
      id: this.currentId++,
      message: dto.message,
      createdAt: new Date(),
    };

    this.notifications.push(notification);
    return notification;
  }

  findAll(): Notification[] {
    return this.notifications;
  }
}