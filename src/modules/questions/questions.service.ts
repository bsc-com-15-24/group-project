import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class QuestionsService {
  private questions: Question[] = [];
  private currentId = 1;

  constructor(private notificationsService: NotificationsService) {}

  create(dto: CreateQuestionDto): Question {
    const question: Question = {
      id: this.currentId++,
      ...dto,
    };

    this.questions.push(question);

    // 🔔 CREATE NOTIFICATION HERE
    this.notificationsService.create({
      message: `New question created: ${question.title}`,
    });

    return question;
  }

  findAll(): Question[] {
    return this.questions;
  }

  findOne(id: number): Question {
    const q = this.questions.find((x) => x.id === id);
    if (!q) throw new NotFoundException('Question not found');
    return q;
  }

  update(id: number, dto: CreateQuestionDto): Question {
    const q = this.findOne(id);
    q.title = dto.title;
    q.content = dto.content;
    return q;
  }

  remove(id: number) {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) throw new NotFoundException('Question not found');

    this.questions.splice(index, 1);
    return { message: 'Deleted successfully' };
  }
}
