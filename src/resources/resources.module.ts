// ================= MODULE =================
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
imports: [TypeOrmModule.forFeature([Resource]), NotificationModule],
controllers: [ResourcesController],
providers: [ResourcesService],
})
export class ResourcesModule {}
