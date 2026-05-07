import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entity/notification.entity';
import { User } from '../user/user-entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private notifRepo: Repository<Notification>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(userId: number | null, type: string, message: string) {
    const notif = this.notifRepo.create({ userId, message, type });
    return this.notifRepo.save(notif);
  }

  async createGlobal(type: string, message: string, excludeUserId?: number) {
    let query = this.userRepo.createQueryBuilder('user').select('user.id');
    if (excludeUserId) {
      query = query.where('user.id != :id', { id: excludeUserId });
    }
    const users = await query.getMany();
    
    const notifs = users.map((user) =>
      this.notifRepo.create({ userId: user.id, message, type }),
    );
    return this.notifRepo.save(notifs);
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
      where: { userId, isRead: false },
    });
  }

  async remove(id: number, userId: number) {
    return this.notifRepo.delete({ id, userId });
  }

  async clearAll(userId: number) {
    return this.notifRepo.delete({ userId });
  }
}
