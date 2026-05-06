import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    private notificationService: NotificationService,
  ) {}

  async create(dto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepo.create(dto);
    const saved = await this.questionRepo.save(question);

    // 🔔 CREATE NOTIFICATION (null userId = system-level)
    await this.notificationService.create(
      null,
      'question_created',
      `New question created: ${saved.title}`,
    );

    return saved;
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepo.find();
  }

  async findOne(id: number): Promise<Question> {
    const q = await this.questionRepo.findOne({ where: { id } });
    if (!q) throw new NotFoundException('Question not found');
    return q;
  }

  async update(id: number, dto: CreateQuestionDto): Promise<Question> {
    await this.findOne(id);
    await this.questionRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.questionRepo.delete(id);
    return { message: 'Deleted successfully' };
  }
}
