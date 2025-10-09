import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ 
    status: 200, 
    description: 'User registered successfully', 
    schema: { 
      type: 'object', 
      properties: { 
        access_token: { type: 'string' } 
      } 
    } 
  })
  @ApiResponse({ status: 409, description: 'User with this email or username already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ 
    status: 200, 
    description: 'User logged in successfully', 
    schema: { 
      type: 'object', 
      properties: { 
        access_token: { type: 'string' } 
      } 
    } 
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}