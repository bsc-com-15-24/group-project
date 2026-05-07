import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateNotificationDto } from './dto/create-notification.dto';

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

  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notifService.create(dto.userId, dto.type, dto.message);
  }

  @Post('global')
  createGlobal(@Body() dto: { type: string; message: string }) {
    return this.notifService.createGlobal(dto.type, dto.message);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.notifService.remove(+id, req.user.userId);
  }

  @Delete()
  clearAll(@Request() req: RequestWithUser) {
    return this.notifService.clearAll(req.user.userId);
  }
}
