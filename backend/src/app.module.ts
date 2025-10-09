import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'dev',
      password: process.env.DB_PASSWORD || 'dev',
      database: process.env.DB_NAME || 'dev_db',
      autoLoadEntities: true,
      synchronize: false, // Don't use synchronize in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}