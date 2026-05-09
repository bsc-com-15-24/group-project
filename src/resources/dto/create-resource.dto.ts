import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @Transform(({ value }) => (value === '' ? undefined : value))
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  courseId: number;

  @Transform(({ value }) => (value === '' ? undefined : value))
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  uploadedById: number;

  @IsString()
  @IsOptional()
  fileUrl?: string;
}
