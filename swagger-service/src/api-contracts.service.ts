import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiContractsService {
  private readonly logger = new Logger(ApiContractsService.name);
  
  constructor(private httpService: HttpService) {}

  async fetchBackendApiSpec(): Promise<any> {
    try {
      // In our docker environment, the backend service runs on port 4000 internally
      // but might be accessible through the nginx proxy as well
      const response = await firstValueFrom(
        this.httpService.get(`http://backend:4000/api-json`)
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching backend API spec: ${error.message}`);
      // Return a static version as fallback
      return {
        openapi: '3.0.0',
        info: {
          title: 'Backend Service API',
          version: '1.0.0',
          description: 'API documentation for the backend service'
        },
        paths: {
          '/health': {
            get: {
              summary: 'Health check endpoint',
              responses: {
                '200': {
                  description: 'Health status'
                }
              }
            }
          },
          '/hello': {
            get: {
              summary: 'Hello endpoint',
              responses: {
                '200': {
                  description: 'Hello message'
                }
              }
            }
          }
        }
      };
    }
  }

  async fetchAuthApiSpec(): Promise<any> {
    try {
      // In our docker environment, the auth service runs internally
      const response = await firstValueFrom(
        this.httpService.get(`http://auth:4001/api-json`) // Adjust port as needed
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching auth API spec: ${error.message}`);
      // Return a static version as fallback
      return {
        openapi: '3.0.0',
        info: {
          title: 'Auth Service API',
          version: '1.0.0',
          description: 'API documentation for the auth service'
        },
        paths: {
          '/auth/register': {
            post: {
              summary: 'Register a new user',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        email: { type: 'string' },
                        username: { type: 'string' },
                        password: { type: 'string' }
                      },
                      required: ['email', 'password']
                    }
                  }
                }
              },
              responses: {
                '200': {
                  description: 'User registered successfully',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          access_token: { type: 'string' }
                        }
                      }
                    }
                  }
                },
                '409': {
                  description: 'User with this email or username already exists'
                }
              }
            }
          },
          '/auth/login': {
            post: {
              summary: 'Login user',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        email: { type: 'string' },
                        password: { type: 'string' }
                      },
                      required: ['email', 'password']
                    }
                  }
                }
              },
              responses: {
                '200': {
                  description: 'User logged in successfully',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          access_token: { type: 'string' }
                        }
                      }
                    }
                  }
                },
                '401': {
                  description: 'Invalid email or password'
                }
              }
            }
          }
        }
      };
    }
  }
  
  async fetchAllApiSpecs(): Promise<any> {
    const [backendSpec, authSpec] = await Promise.allSettled([
      this.fetchBackendApiSpec(),
      this.fetchAuthApiSpec()
    ]);

    const specs = {};
    
    if (backendSpec.status === 'fulfilled') {
      specs['backend'] = backendSpec.value;
    } else {
      this.logger.error('Failed to fetch backend spec:', backendSpec.reason);
    }
    
    if (authSpec.status === 'fulfilled') {
      specs['auth'] = authSpec.value;
    } else {
      this.logger.error('Failed to fetch auth spec:', authSpec.reason);
    }

    return specs;
  }
}