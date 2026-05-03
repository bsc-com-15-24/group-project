import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
@IsString()
@IsNotEmpty()
name!: string;

@IsEmail()
email!: string;


@IsString()
@IsOptional()
role?: string;
}