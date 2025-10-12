import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the centralized API documentation service!';
  }

  getHealth(): object {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }
}