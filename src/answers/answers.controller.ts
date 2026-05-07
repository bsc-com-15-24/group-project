import { Controller, Post, Body, Param, Request, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/questions')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':questionId/answers')
  create(
    @Param('questionId') questionId: string,
    @Body() dto: CreateAnswerDto,
    @Request() req: any
  ) {
    return this.answersService.create(Number(questionId), req.user.userId, dto);
  }

  @Put(':questionId/answers/:answerId/accept')
  accept(
    @Param('answerId') answerId: string,
    @Request() req: any
  ) {
    return this.answersService.accept(Number(answerId), req.user.userId);
  }
}
