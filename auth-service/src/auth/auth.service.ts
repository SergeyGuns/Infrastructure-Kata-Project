import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { RsaService } from './rsa.service';
import { signRSA } from './jwt.util';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rsaService: RsaService,
    private passwordService: PasswordService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: registerDto.email }],
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password before creating the user
    const hashedPassword = await this.passwordService.hashPassword(registerDto.password);

    // Create new user
    const user = new User();
    user.email = registerDto.email;
    user.username = registerDto.username;
    user.password = hashedPassword;
    
    const savedUser = await this.usersRepository.save(user);

    // Generate JWT token with RSA signature
    const payload = { sub: savedUser.id, email: savedUser.email, username: savedUser.username };
    const access_token = signRSA(payload, this.rsaService.getPrivateKey(), { expiresIn: '1h' });

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
    const isPasswordValid = await this.passwordService.verifyPassword(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token with RSA signature
    const payload = { sub: user.id, email: user.email, username: user.username };
    const access_token = signRSA(payload, this.rsaService.getPrivateKey(), { expiresIn: '1h' });

    return { access_token };
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }
}