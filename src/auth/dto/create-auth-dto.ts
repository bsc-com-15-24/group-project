import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
export class CreateAuthDto {
@IsString()
@IsNotEmpty()
name!: string;

@IsEmail()
@IsNotEmpty()
email!: string;


@IsString()
@IsOptional()
role?: string;
}