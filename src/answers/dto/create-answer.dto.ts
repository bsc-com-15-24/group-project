import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  resourceId?: number;
}
