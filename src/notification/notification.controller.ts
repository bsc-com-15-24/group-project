import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(private readonly notifService: NotificationService) { }

    @Get()
    getAll(@Request() req) {
        return this.notifService.findAllForUser(req.user.id);
    }

    @Get('unread')
    getUnreadCount(@Request() req) {
        return this.notifService.countUnread(req.user.id);
    }

    @Patch(':id/read')
    markRead(@Param('id') id: string) {
        return this.notifService.markAsRead(+id);
    }

    @Patch('read-all')
    markAllRead(@Request() req) {
        return this.notifService.markAllAsRead(req.user.id);
    }
}
