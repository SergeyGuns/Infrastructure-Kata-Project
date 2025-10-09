import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): any {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'backend'
    };
  }

  getHello(): any {
    return {
      message: 'Hello from Backend Service!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
  }
}