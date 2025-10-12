import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('backend')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the health status of the service',
    schema: { 
      type: 'object', 
      properties: { 
        status: { type: 'string' },
        timestamp: { type: 'string' }
      } 
    } 
  })
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('hello')
  @ApiOperation({ summary: 'Hello endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a hello message',
    schema: { 
      type: 'string' 
    } 
  })
  getHello() {
    return this.appService.getHello();
  }
}