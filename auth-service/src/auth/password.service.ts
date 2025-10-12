import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hashPassword as defaultHashPassword, verifyPassword, hashPasswordWithSalt } from './password.util';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) {}

  /**
   * Hash a password using a random salt (default approach)
   */
  async hashPassword(password: string): Promise<string> {
    return defaultHashPassword(password);
  }

  /**
   * Hash a password using the salt from environment variables
   */
  async hashPasswordWithEnvSalt(password: string): Promise<string> {
    const salt = this.configService.get<string>('PASSWORD_SALT') || 'a-very-secure-salt-value-for-password-hashing';
    return hashPasswordWithSalt(password, salt);
  }

  /**
   * Verify a password against a hashed password
   */
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return verifyPassword(password, hashedPassword);
  }
}