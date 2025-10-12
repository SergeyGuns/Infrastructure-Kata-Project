import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { RsaService } from './rsa.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly rsaService: RsaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKeyProvider: (_req, _token, done) => {
        // Provide the RSA public key for token verification
        done(null, rsaService.getPublicKey());
      },
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