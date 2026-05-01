import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


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
entities: [],
logging: true,
}),
}),
AuthModule,
UserModule,
],
})
export class AppModule {}