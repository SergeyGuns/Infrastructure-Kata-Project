import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: registerDto.email }, { username: registerDto.username }],
    });

    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    // Create new user
    const user = new User();
    user.email = registerDto.email;
    user.username = registerDto.username;
    user.password = registerDto.password; // Will be hashed in the user entity

    await user.hashPassword(); // Hash the password
    
    const savedUser = await this.usersRepository.save(user);

    // Generate JWT token
    const payload = { sub: savedUser.id, email: savedUser.email, username: savedUser.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    // Find user by email
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }
}