import { IsString, IsEmail, IsOptional, IsNotEmpty,MinLength } from 'class-validator';
export class RegisterDto {
@IsString()
@IsNotEmpty()
username!: string;

@IsEmail()
@IsNotEmpty()
email!: string;


@IsString()
@IsNotEmpty()
@MinLength(8,{message: 'Password must be at least 8 characters long'})
password!: string;

@IsString()
@IsOptional()
role?: string;
}