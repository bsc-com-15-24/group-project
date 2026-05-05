import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { course } from './course.entity';

@Injectable()
export class CoursesService{
    constructor(
        @InjectRepository(course)
        private coursesRepository: Repository<course>,
    ) {}

    async create(Data: Partial<course>): Promise<course> {
        const course = this.coursesRepository.create(Data);
        return this.coursesRepository.save(course);
}

async findAll(): Promise<course[]> {
    return this.coursesRepository.find();
}

async findOne(id: number): Promise<course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (!course) {
        throw new NotFoundException(`Course #${id} not found`);
    }
    return course;
}

async update(id: number, Data: Partial<course>): Promise<course> {
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