import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { Answer } from './answer.entity';
import { QuestionsModule } from '../questions/questions.module';
import { NotificationModule } from '../notification/notification.module';
import { ResourcesModule } from '../resources/resources.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionsModule, NotificationModule, ResourcesModule],
  providers: [AnswersService],
  controllers: [AnswersController]
})
export class AnswersModule {}
