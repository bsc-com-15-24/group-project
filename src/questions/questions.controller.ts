import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  create(@Body() dto: CreateQuestionDto, @Request() req: any) {
    return this.questionsService.create(dto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateQuestionDto) {
    return this.questionsService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(Number(id));
  }
}
