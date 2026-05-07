// ================= SERVICE =================
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { NotificationService } from 'src/notification/notification.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepo: Repository<Resource>,
    private notifService: NotificationService,
    private mailerService: MailerService,
    private usersService: UsersService,
  ) { }

  async create(dto: CreateResourceDto, userId?: number): Promise<Resource> {
    const resource = this.resourceRepo.create(dto);
    const saved = await this.resourceRepo.save(resource);
    if (userId) {
      await this.notifService.create(
        userId,
        'resource_uploaded',
        `Your resource "${saved.title}" was uploaded successfully.`,
      );
    }

    // Notify all users 
    this.usersService.findAll().then((users) => {
      users.forEach((user) => {
        this.mailerService.sendMail({
          to: user.email,
          subject: `New Resource Uploaded: ${saved.title}`,
          text: `A new resource has been uploaded!\n\nTitle: ${saved.title}\nDescription: ${saved.description}\nDownload it here: http://localhost:3000/uploads/${saved.fileUrl}`,
        }).catch(err => console.error('Failed to send email:', err));
      });
    });

    return saved;
  }
  async searchByName(name: string): Promise<Resource[]> {
    return this.resourceRepo.find({
      where: { title: Like(`%${name}%`) },
    });
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceRepo.find();
  }
  async findOne(id: number): Promise<Resource> {
    const resource = await this.resourceRepo.findOne({ where: { id } });
    if (!resource)
      throw new NotFoundException(`resource with id ${id} not found`);
    return resource;
  }
  async update(id: number, dto: UpdateResourceDto): Promise<Resource> {
    await this.findOne(id);
    await this.resourceRepo.update(id, dto);
    return await this.findOne(id);
  }
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.resourceRepo.delete(id);
    return { message: `resource ${id} deleted successfully` };
  }
}
