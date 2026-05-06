import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto  {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;

}