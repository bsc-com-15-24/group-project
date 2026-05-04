import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResourceDto {
@IsString()
@IsNotEmpty()
title: string;

@IsString
description: string;

@IsNumber()
courseId: number;

@IsNumber()
uploadedBy: number;
}