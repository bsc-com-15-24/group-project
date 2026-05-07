import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) { }

  async create(Data: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(Data);
    return this.coursesRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return course;
  }

  async update(id: number, Data: Partial<CreateCourseDto>): Promise<Course> {
    await this.findOne(id);
    await this.coursesRepository.update(id, Data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.coursesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course #${id} not found`);
    }
  }
}
