// ================= CONTROLLER =================
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesService } from './resources.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/resources')
@UseGuards(JwtAuthGuard)
export class ResourcesController {
    constructor(private readonly service: ResourcesService) { }
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const name = file.originalname.split('.')[0];
                callback(null, `${name}-${uniqueSuffix}${ext}`);
            }
        })
    }))
    create(
        @Body() dto: CreateResourceDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        if (file) {
            return this.service.create({
                ...dto,
                fileUrl: file.filename,
            });
        }
        return this.service.create(dto);
    }
    @Get()
    findAll() {
        return this.service.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateResourceDto) {
        return this.service.update(id, dto);
    }
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}