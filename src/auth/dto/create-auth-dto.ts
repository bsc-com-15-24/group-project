import { IsString, IsEmail, IsOptional, IsNotEmpty,MinLength } from 'class-validator';
export class CreateAuthDto {
@IsString()
@IsNotEmpty()
name!: string;

@IsEmail()
@IsNotEmpty()
email!: string;


@IsString()
@IsNotEmpty()
@MinLength(8,{message: 'Password must be at least 8 characters long'})

@IsString()
@IsOptional()
role?: string;
}