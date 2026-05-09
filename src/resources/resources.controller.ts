// ================= CONTROLLER =================
import { ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, Query, } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesService } from './resources.service';
import { Resource } from './entities/resource.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends ExpressRequest {
  user: {
    userId: number;
    username: string;
  };
}

@ApiBearerAuth()
@Controller('api/v1/resources')
@UseGuards(JwtAuthGuard)
export class ResourcesController {
  constructor(private readonly service: ResourcesService) { }
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        courseId: { type: 'number' },
        uploadedById: { type: 'number' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const name = file.originalname.split('.')[0];
          callback(null, `${name}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateResourceDto,
    @UploadedFile() file?: Express.Multer.File,
    @Request() req?: RequestWithUser,
  ): Promise<Resource> {
    const userId = req?.user?.userId;
    if (file) {
      return this.service.create(
        {
          ...dto,
          fileUrl: file.filename,
        },
        userId,
      );
    }
    return this.service.create(dto, userId);
  }
  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.service.searchByName(name);
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
