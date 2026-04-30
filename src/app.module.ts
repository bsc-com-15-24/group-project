import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { Auth#Controller } from './auth#/auth#.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [StudentsModule, AuthModule, UserModule],
  controllers: [AppController, Auth#Controller],
  providers: [AppService],
})
export class AppModule {}
