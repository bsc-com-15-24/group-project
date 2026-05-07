import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { QuestionsService } from '../questions/questions.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepo: Repository<Answer>,
    private questionsService: QuestionsService,
    private notifService: NotificationService,
  ) {}

  async create(questionId: number, userId: number, dto: CreateAnswerDto) {
    const question = await this.questionsService.findOne(questionId);

    const answer = this.answerRepo.create({
      ...dto,
      question: { id: questionId } as any,
      author: { id: userId } as any,
    });
    const saved = await this.answerRepo.save(answer);

    // Notify the author of the question (if it's not the same person)
    if (question.author && question.author.id !== userId) {
      await this.notifService.create(
        question.author.id,
        'new_answer',
        `Someone answered your question: "${question.title}"`
      );
    }

    return saved;
  }

  async accept(answerId: number, userId: number) {
    const answer = await this.answerRepo.findOne({
      where: { id: answerId },
      relations: ['question', 'question.author', 'author']
    });
    if (!answer) throw new NotFoundException('Answer not found');
    
    // Only the question author can accept an answer
    if (answer.question.author.id !== userId) {
      throw new ForbiddenException('Only the author of the question can accept an answer');
    }

    answer.isAccepted = true;
    const saved = await this.answerRepo.save(answer);
    
    // Notify the author of the answer!
    await this.notifService.create(
      answer.author.id,
      'answer_accepted',
      `Your answer to "${answer.question.title}" was accepted as correct!`
    );

    return saved;
  }
}
