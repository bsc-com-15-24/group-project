import { Controller, Post, Body, Param, Request, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const name = file.originalname.split('.')[0];
          callback(null, `${name}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Param('questionId') questionId: string,
    @Body() dto: CreateAnswerDto,
    @Request() req: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.answersService.create(Number(questionId), req.user.userId, dto, file?.filename);
  }

  @Put(':questionId/answers/:answerId/accept')
  accept(
    @Param('answerId') answerId: string,
    @Request() req: any
  ) {
    return this.answersService.accept(Number(answerId), req.user.userId);
  }
}
