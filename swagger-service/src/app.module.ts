import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiContractsService } from './api-contracts.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiContractsService],
})
export class AppModule {}