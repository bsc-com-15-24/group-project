import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    username: string;
  };
}

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notifService: NotificationService) {}

  @Get()
  getAll(@Request() req: RequestWithUser) {
    return this.notifService.findAllForUser(req.user.userId);
  }

  @Get('unread')
  getUnreadCount(@Request() req: RequestWithUser) {
    return this.notifService.countUnread(req.user.userId);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.notifService.markAsRead(+id);
  }

  @Patch('read-all')
  markAllRead(@Request() req: RequestWithUser) {
    return this.notifService.markAllAsRead(req.user.userId);
  }
}
