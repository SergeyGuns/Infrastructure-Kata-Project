import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { User } from './user.entity';
import { RsaService } from './auth/rsa.service';

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
      entities: [User],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService, rsaService: RsaService) => {
        // Wait for RSA service to initialize
        await rsaService.onModuleInit();
        
        return {
          secretOrKey: rsaService.getPublicKey(), // Provide the public key for verification
          signOptions: { 
            expiresIn: '1h',
            algorithm: 'RS256' // Use RS256 algorithm for verification
          },
        };
      },
      inject: [ConfigService, RsaService],
    }),
    PassportModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategy, RsaService],
  exports: [RsaService],
})
export class AppModule {}