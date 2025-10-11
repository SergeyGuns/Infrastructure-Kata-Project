import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'], // Specify the algorithm to use (RSA signing)
      // The secretOrKey will be provided by the JwtModule configuration
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;
    return await this.usersRepository.findOne({ 
      where: { id },
      select: ['id', 'email', 'username', 'createdAt']
    });
  }
}