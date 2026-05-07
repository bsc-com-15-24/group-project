import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { NotificationService } from '../notification/notification.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    private notificationService: NotificationService,
    private mailerService: MailerService,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateQuestionDto, userId: number): Promise<Question> {
    const question = this.questionRepo.create({
      ...dto,
      author: { id: userId } as any,
    });
    const saved = await this.questionRepo.save(question);

    // 🔔 CREATE SYSTEM NOTIFICATION
    await this.notificationService.create(
      null,
      'question_created',
      `New question created: ${saved.title}`,
    );

    // 📧 NOTIFY ALL USERS VIA EMAIL AND IN-APP
    this.usersService.findAll().then((users) => {
      users.forEach((user) => {
        // Send In-App Notification (only if it's not the author)
        if (user.id !== userId) {
          this.notificationService.create(
            user.id,
            'new_question',
            `A new question has been asked: "${saved.title}"`,
          ).catch(err => console.error('In-app notif failed:', err));
        }

        // Send Email
        this.mailerService.sendMail({
          to: user.email,
          subject: `New Question Asked: ${saved.title}`,
          text: `A new question has been posted in the community!\n\nTitle: ${saved.title}\nContent: ${saved.content}\n\nView it here: http://localhost:3000/api/v1/questions/${saved.id}`,
        }).catch(err => console.error('Email failed:', err));
      });
    });

    return saved;
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepo.find({
      relations: ['author', 'course'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Question> {
    const q = await this.questionRepo.findOne({ 
      where: { id },
      relations: ['author', 'course', 'answers', 'answers.author']
    });
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
