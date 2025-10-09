import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Post('login')
  async login(@Request() req) {
    // In a real application, you would validate credentials here
    const user = { id: 1, username: req.body.username }; // This is simplified
    const token = this.jwtService.sign(user);
    
    return {
      access_token: token,
    };
  }

  @Post('register')
  async register(@Request() req) {
    // In a real application, you would create a new user here
    return {
      message: 'User registered successfully',
    };
  }
}