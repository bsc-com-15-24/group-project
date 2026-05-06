import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  courseId: number;

  @IsNumber()
  uploadedById: number;

  @IsString()
  @IsOptional()
  fileUrl?: string;
}
