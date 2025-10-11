import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './auth.dto';
import { hashPassword } from './password.util';
import { RsaService } from './rsa.service';

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let rsaService: RsaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: RsaService,
          useValue: {
            getPrivateKey: jest.fn(() => 'mock_private_key'),
            getPublicKey: jest.fn(() => 'mock_public_key'),
            onModuleInit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    rsaService = module.get<RsaService>(RsaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'save').mockResolvedValue({
        id: '1',
        email: registerDto.email,
        username: registerDto.username,
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User);

      // Mock the signRSA function since we can't import it directly in the test
      const originalSignRSA = jest.requireActual('./jwt.util').signRSA;
      jest.spyOn(require('./jwt.util'), 'signRSA').mockReturnValue('mocked_rsa_token');

      const result = await service.register(registerDto);

      expect(result).toEqual({ access_token: 'mocked_rsa_token' });
    });

    it('should throw ConflictException if user already exists', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue({} as User);

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should login a user with correct credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = new User();
      user.id = '1';
      user.email = loginDto.email;
      user.username = 'testuser';
      user.password = await hashPassword(loginDto.password);

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      // Mock the signRSA function since we can't import it directly in the test
      const originalSignRSA = jest.requireActual('./jwt.util').signRSA;
      jest.spyOn(require('./jwt.util'), 'signRSA').mockReturnValue('mocked_rsa_token');

      const result = await service.login(loginDto);

      expect(result).toEqual({ access_token: 'mocked_rsa_token' });
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = new User();
      user.id = '1';
      user.email = loginDto.email;
      user.username = 'testuser';
      user.password = await hashPassword('different_password');

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});