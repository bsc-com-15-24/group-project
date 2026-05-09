import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class CreateQuestionDto {
  @ApiProperty({ description: 'The title of the question' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The content/body of the question' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: false, description: 'Optional course ID' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @Type(() => Number)
  courseId?: number;

  @ApiProperty({ required: false, description: 'Optional ID of an existing resource' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @Type(() => Number)
  resourceId?: number;
}
