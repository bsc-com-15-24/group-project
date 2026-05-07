import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user-entity';
import { ResourcesModule } from './resources/resources.module';
import { Resource } from './resources/entities/resource.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Notification } from './notification/entity/notification.entity';
import { NotificationModule } from './notification/notification.module';
import { Course } from './courses/course.entity';
import { CoursesModule } from './courses/courses.module';
import { Question } from './questions/question.entity';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { Answer } from './answers/answer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'oracle',
        host: config.get('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        serviceName: config.get('DB_SERVICE_NAME'),
        synchronize: config.get('DB_SYNCHRONIZE') === 'true',
        entities: [User, Resource, Notification, Course, Question, Answer],
        logging: true,
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          port: config.get('SMTP_PORT', 587),
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS'),
          },
        },
        defaults: {
          from: config.get('SMTP_FROM', '"Students Notes" <noreply@studentsnotes.com>'),
        },
      }),
    }),

    AuthModule,
    UserModule,
    ResourcesModule,
    NotificationModule,
    CoursesModule,
    QuestionsModule,
    AnswersModule,
  ],
})
export class AppModule {}
