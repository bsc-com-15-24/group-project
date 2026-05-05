// ================= SERVICE =================
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
    constructor(
        @InjectRepository(Resource)
        private resourceRepo: Repository<Resource>,
    ) {}

    create(dto: CreateResourceDto) {
        const resource = this.resourceRepo.create(dto);
        return this.resourceRepo.save(resource);
    }
async findAll(): Promise<Resource[]> {
return this.resourceRepo.find();
}
async findOne(id: number): Promise<Resource> {
const resource = await this.resourceRepo.findOne({where:{id} });
if(!resource) throw new NotFoundException(`resource with id ${id} not found`);
return resource;
}
async update(id: number, dto: UpdateResourceDto): Promise<Resource> {
const resource = await this.resourceRepo.findOne({where: {id}});
await this.resourceRepo.update(id,dto);
return await this.findOne(id);
}
async remove(id: number): Promise<{message: string}> {
const resource = await this.resourceRepo.findOne({where: {id}});
await this.resourceRepo.delete(id);
return {message : `resource ${id} deleted successfully`};
}
}