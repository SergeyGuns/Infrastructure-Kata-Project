import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiContractsService } from './api-contracts.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('api-contracts')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly apiContractsService: ApiContractsService,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the health status of the swagger service',
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
    description: 'Returns a welcome message',
    schema: { 
      type: 'string' 
    } 
  })
  getHello() {
    return this.appService.getHello();
  }

  @Get('contracts')
  @ApiOperation({ summary: 'Get API contracts from all microservices' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns API contracts from all microservices',
    schema: { 
      type: 'object',
      properties: {
        services: {
          type: 'object',
          properties: {
            backend: { type: 'object' },
            auth: { type: 'object' }
          }
        }
      }
    } 
  })
  async getApiContracts() {
    const specs = await this.apiContractsService.fetchAllApiSpecs();
    
    return {
      services: specs
    };
  }
}