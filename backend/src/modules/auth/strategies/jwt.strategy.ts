import { UserStatusEnum } from '@app/enums';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { JwtPayload } from '../contracts/jwt-payload';
import {
  UnActiveUserException,
  UnAuthenticationException,
} from '../exceptions';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.token'),
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const result = await this.jwtService.validatePayload(payload);

    if (!result) {
      throw new UnAuthenticationException();
    }

    const actor: any = await this.jwtService.findUserById(result.id);

    if (!actor) {
      throw new UnAuthenticationException();
    }

    if (actor.status !== UserStatusEnum.Active) {
      throw new UnActiveUserException();
    }

    return done(null, actor, payload.iat);
  }
}
