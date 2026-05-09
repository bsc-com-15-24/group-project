import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class CreateAnswerDto {
  @ApiProperty({ description: 'The content of the answer' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: false, description: 'Optional ID of an existing resource' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  resourceId?: number;
}
