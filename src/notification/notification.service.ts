import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entity/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification) private notifRepo: Repository<Notification>,) { }

    async create(userId: number, type: string, message: string) {
        const notif = this.notifRepo.create({ userId, message, type });
        return this.notifRepo.save(notif);
    }
    async findAllForUser(userId: number) {
        return this.notifRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' },


        });
    }
    async markAsRead(id: number) {
        return this.notifRepo.update(id, { isRead: true });
    }
    async markAllAsRead(userId: number) {
        return this.notifRepo.update({ userId, isRead: false }, { isRead: true });
    }
    async countUnread(userId: number) {
        return this.notifRepo.count({
            where: { userId, isRead: false }
        });
    }
}