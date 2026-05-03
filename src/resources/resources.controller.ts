// ================= CONTROLLER =================
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResourceDto } from './dto/create-resource.dto';

@Controller('api/v1/resources')
export class ResourcesController {
    constructor(private readonly service: ResourcesService) {}
    @Post()
    @UserInterceptors(FileInterceptor('file'))
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateResourceDto,
    ) {
        //you can save file.path or file.filename
        return this.service.create ({
            ...dto,
            fileUrl:file.filename,
        });
    }
    @Post()
    create(@Body() dto: CreateResourceDto) {
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