import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHealth', () => {
    it('should return health status object', () => {
      const result = service.getHealth();
      
      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        service: 'backend',
      });
      
      // Check that timestamp is in ISO format
      expect(new Date(result.timestamp).toISOString()).toEqual(result.timestamp);
    });
  });

  describe('getHello', () => {
    it('should return hello message object', () => {
      const result = service.getHello();
      
      expect(result).toEqual({
        message: 'Hello from Backend Service!',
        timestamp: expect.any(String),
        environment: expect.any(String),
      });
      
      // Check that timestamp is in ISO format
      expect(new Date(result.timestamp).toISOString()).toEqual(result.timestamp);
    });

    it('should return development environment when NODE_ENV is not set', () => {
      // Unset NODE_ENV for this test
      delete process.env.NODE_ENV;
      const result = service.getHello();
      
      expect(result.environment).toEqual('development');
    });
  });
});