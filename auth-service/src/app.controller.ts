import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('status')
  getStatus() {
    return this.appService.getHealth();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { message: 'This is your profile', user: req.user };
  }
}