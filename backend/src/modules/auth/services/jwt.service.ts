import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

import { JwtPayload } from '../contracts/jwt-payload';
import { randomBytes } from 'crypto';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { BaseService } from '@app/shared';
import {
  InvalidRefreshException,
  UnAuthenticationException,
} from '../exceptions';
import { PrismaService } from '@app/prisma';

@Injectable()
export class JwtService extends BaseService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;
  private refreshTokenTtl: number;
  private readonly expiresInDefault: string | number;
  public sub: any | number;

  // @todo: should be put in redis cache
  private readonly usersExpired: number[] = [];

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.expiresInDefault =
      this.configService.get<string>('jwt.accessTokenTtl');
    this.jwtOptions = { expiresIn: this.expiresInDefault };
    this.jwtKey = this.configService.get<string>('jwt.token');
    this.refreshTokenTtl = this.configService.get<number>(
      'jwt.refreshTokenTtl',
    );
  }

  async findUserById(id: number) {
    let user = null;
    if (id) {
      user = await this.prisma.user.findFirst({
        where: { id },
        include: {
          roles: {
            select: {
              key: true,
              title: true,
            },
          },
          profile: {
            include: {
              country: true,
              province: true,
              avatar: true,
            },
          },
        },
      });
    }
    return user;
  }

  async getAccessTokenFromRefreshToken(
    refreshToken: string,
    oldAccessToken: string,
  ) {
    try {
      const token = await this.prisma.refreshToken.findFirst({
        where: { token: refreshToken },
      });

      const currentDate = new Date();
      if (!token || token.expires_at < currentDate) {
        throw new InvalidRefreshException();
      }

      const oldPayload = await this.validateToken(oldAccessToken, true);
      const payload = { sub: oldPayload.sub };
      this.sub = oldPayload.sub;

      const tokens = await this.createAccessToken(payload);
      const clientId = uuidv4();

      tokens.refresh_token = await this.createRefreshToken({
        userId: this.sub,
        clientId: clientId,
      });

      return tokens;
    } catch (error) {
      throw new InvalidRefreshException();
    }
  }

  async createTokens(user_id: number) {
    const payload: JwtPayload = { sub: user_id };

    const tokens = await this.createAccessToken(payload);
    await this.deleteRefreshTokenForUser(user_id);

    tokens.refresh_token = await this.createRefreshToken({
      userId: user_id,
      clientId: uuidv4(),
    });

    return tokens;
  }

  async createAccessToken(
    payload: JwtPayload,
    expires = this.expiresInDefault,
  ) {
    const options = this.jwtOptions;
    expires > 0 ? (options.expiresIn = expires) : delete options.expiresIn;
    options.jwtid = uuidv4();
    const signedPayload = sign(payload, this.jwtKey, options);
    return {
      access_token: signedPayload,
      refresh_token: '',
    };
  }

  async createRefreshToken(tokenContent: {
    userId: number;
    clientId: string;
  }): Promise<string> {
    const { userId, clientId } = tokenContent;

    await this.deleteRefreshTokenByClientId(userId, clientId);

    const refreshToken = randomBytes(64).toString('hex');

    await this.prisma.refreshToken.create({
      data: {
        user_id: userId,
        token: refreshToken,
        client_id: clientId,
        expires_at: moment().add(this.refreshTokenTtl, 'd').toDate(),
      },
    });

    return refreshToken;
  }

  async deleteRefreshTokenForUser(userId: number): Promise<void> {
    await this.revokeTokenForUser(userId);
  }

  async deleteRefreshTokenByClientId(
    userId: number,
    clientId: string,
  ): Promise<void> {
    try {
      if (clientId) {
        await this.prisma.refreshToken.delete({
          where: {
            client_id: clientId,
          },
        });
      }

      if (userId) {
        await this.revokeTokenForUser(userId);
      }
    } catch (error) {
      Logger.error(error.message, 'JwtService');
    }
  }

  async decodeAndValidateJWT(token: string): Promise<any> {
    if (token) {
      try {
        const payload = await this.validateToken(token);
        return await this.validatePayload(payload);
      } catch (error) {
        Logger.error(error.message, 'JwtService');
        return null;
      }
    }
  }

  async validatePayload(payload: JwtPayload): Promise<any> {
    const tokenBlacklisted = await this.isBlackListed(payload.sub, payload.exp);
    if (!tokenBlacklisted) {
      return {
        id: payload.sub,
      };
    }
    return null;
  }

  private async validateToken(
    token: string,
    ignoreExpiration = true,
  ): Promise<JwtPayload> {
    let result: any;
    try {
      result = verify(token, this.configService.get<string>('jwt.token'), {
        ignoreExpiration,
      });
    } catch (error) {
      throw new UnAuthenticationException();
    }
    return result as JwtPayload;
  }

  private async isBlackListed(id: number, expire: number): Promise<boolean> {
    return this.usersExpired[id] && expire < this.usersExpired[id];
  }

  private async revokeTokenForUser(userId: number): Promise<any> {
    this.usersExpired[userId] = moment().add(this.expiresInDefault, 's').unix();
  }
}
