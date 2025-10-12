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
import { RsaService } from '../src/auth/rsa.service';
import { AuthConfigModule } from '../src/auth/auth-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env.test', // Use test environment file if available, otherwise will use defaults
    }),
    AuthConfigModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',  // Use SQLite for testing
      database: ':memory:',  // In-memory database
      synchronize: true,  // Automatically create tables
      logging: false,
      entities: [User],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: async (configService: ConfigService, rsaService: RsaService) => {
        // Wait for RSA service to initialize
        await rsaService.onModuleInit();
        
        return {
          secretOrKey: rsaService.getPublicKey(), // Provide the public key for verification
          algorithms: ['RS256'],
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
})
export class TestAppModule {}