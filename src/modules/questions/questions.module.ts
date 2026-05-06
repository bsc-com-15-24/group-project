import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule], // 👈 CRITICAL
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}