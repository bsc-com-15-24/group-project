// ================= SERVICE =================
import { Injectable } from '@nestjs/common';
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
findAll() {
return this.resourceRepo.find();
}
findOne(id: number) {
return this.resourceRepo.findOneBy({ id });
}
update(id: number, dto: UpdateResourceDto) {
return this.resourceRepo.update(id, dto);
}
remove(id: number) {
return this.resourceRepo.delete(id);}
}