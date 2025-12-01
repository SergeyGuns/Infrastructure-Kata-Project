import { Injectable } from '@nestjs/common';

interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

interface HelloResponse {
  message: string;
  timestamp: string;
  environment: string;
}

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'backend'
    };
  }

  getHello(): HelloResponse {
    return {
      message: 'Hello from Backend Service!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
  }
}