import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { NotificationService } from '../notification/notification.service';
import { ResourcesService } from '../resources/resources.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    private notificationService: NotificationService,
    private resourcesService: ResourcesService,
  ) { }

  async create(dto: CreateQuestionDto, userId: number, filename?: string): Promise<Question> {
    let resourceId = dto.resourceId;

    if (filename) {
      const resource = await this.resourcesService.create({
        title: dto.title,
        description: `Attached to question: ${dto.title}`,
        courseId: dto.courseId || 0,
        uploadedById: userId,
        fileUrl: filename,
      }, userId);
      resourceId = resource.id;
    }

    const question = this.questionRepo.create({
      ...dto,
      resourceId,
      author: { id: userId } as any,
    });
    const saved = await this.questionRepo.save(question);

    await this.notificationService.createGlobal(
      'question_created',
      `New question created: ${saved.title}`,
      userId
    );

    return saved;
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepo.find({
      relations: ['author', 'course', 'resource'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Question> {
    const q = await this.questionRepo.findOne({
      where: { id },
      relations: ['author', 'course', 'resource', 'answers', 'answers.author', 'answers.resource']
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
