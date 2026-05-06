import { Module } from '@nestjs/common';
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


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'oracle',
                host: config.get('DB_HOST'),
                port: parseInt(config.get<string>('DB_PORT')!),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                serviceName: config.get('DB_SERVICE_NAME'),
                synchronize: config.get('DB_SYNCHRONIZE') === 'true',
                entities: [User, Resource, Notification],
                logging: true,
            }),
        }),


        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads/',
        }),

        AuthModule,
        UserModule,
        ResourcesModule,
        NotificationModule,
    ],
})
export class AppModule { }