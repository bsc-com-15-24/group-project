import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { Auth#Controller } from './auth#/auth#.controller';

@Module({
  imports: [StudentsModule, AuthModule],
  controllers: [AppController, Auth#Controller],
  providers: [AppService],
})
export class AppModule {}
