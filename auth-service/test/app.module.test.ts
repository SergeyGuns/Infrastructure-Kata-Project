import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AuthService } from '../src/auth/auth.service';
import { AuthController } from '../src/auth/auth.controller';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { User } from '../src/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env.test', // Use test environment file if available, otherwise will use defaults
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',  // Use SQLite for testing
      database: ':memory:',  // In-memory database
      synchronize: true,  // Automatically create tables
      logging: false,
      entities: [User],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'dev_secret', // Use same fallback as JwtStrategy
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class TestAppModule {}