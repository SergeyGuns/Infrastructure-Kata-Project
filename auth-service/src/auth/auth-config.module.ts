import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RsaService } from './rsa.service';
import { PasswordService } from './password.service';

@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  providers: [RsaService, PasswordService],
  exports: [RsaService, PasswordService, ConfigModule],
})
export class AuthConfigModule {}