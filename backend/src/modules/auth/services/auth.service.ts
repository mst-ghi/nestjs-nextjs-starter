import { throwBadRequest } from '@app/shared/errors';
import { throwUnprocessableEntity } from './../../../../libs/shared/src/errors/index';
import { Injectable } from '@nestjs/common';
import { sha3_256 } from 'js-sha3';
import { JwtService } from './jwt.service';
import { RefreshDto, RegisterDto } from '../dto';
import { BaseService } from '@app/shared';
import { UserEntity } from '@app/prisma/entities';
import { PrismaService } from '@app/prisma';
import { InitResponse, LoginResponse, RefreshResponse } from '../responses';
import { RoleKeysEnum } from '@app/enums';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    pass = sha3_256(sha3_256(pass));
    const user = await this.prisma.user.findFirst({
      where: { email },
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
    if (user && user.password === pass) return user;
    return null;
  }

  async login(): Promise<LoginResponse> {
    const tokens = await this.jwtService.createTokens(this._user.id);
    return { tokens, user: this.partial(this._user, UserEntity) };
  }

  async register(dto: RegisterDto) {
    const user = await this.findUserByEmail(dto.email);
    if (user) {
      throwUnprocessableEntity([
        {
          field: 'email',
          message: 'Email exist, please login',
        },
      ]);
    }
    const memberRole = await this.prisma.role.findFirst({
      where: { key: RoleKeysEnum.Member },
    });
    await this.prisma.user.create({
      data: {
        full_name: dto.full_name,
        username: dto.email.split('@')[0],
        email: dto.email,
        password: sha3_256(sha3_256(dto.password)),
        roles: {
          connect: {
            id: memberRole.id,
          },
        },
      },
    });
  }

  async socialite(sUser: any) {
    const { email, first_name, last_name } = sUser;
    let user = await this.findUserByEmail(email);
    if (!user) {
      const memberRole = await this.prisma.role.findFirst({
        where: { key: RoleKeysEnum.Member },
      });

      user = await this.prisma.user.create({
        data: {
          full_name: first_name + ' ' + last_name,
          username: email.split('@')[0],
          email: email,
          password: '',
          roles: {
            connect: {
              id: memberRole.id,
            },
          },
        },
      });
    }
    const tokens = await this.jwtService.createTokens(user.id);
    return {
      tokens,
      user: this.partial(user, UserEntity),
    };
  }

  async init(user: UserEntity): Promise<InitResponse> {
    return { user: this.partial(user, UserEntity) };
  }

  async changePassword(currentPassword: string, newPassword: string) {
    if (
      this._user &&
      this._user.password === sha3_256(sha3_256(currentPassword))
    ) {
      await this.prisma.user.update({
        where: { id: this._userId },
        data: { password: sha3_256(sha3_256(newPassword)) },
      });
    } else {
      throwBadRequest();
    }
  }

  async refreshToken(dto: RefreshDto): Promise<RefreshResponse> {
    const tokens = await this.jwtService.getAccessTokenFromRefreshToken(
      dto.refresh_token,
      dto.old_access_token,
    );
    return { tokens };
  }

  async logout(user: any) {
    this.user = user;
    await this.jwtService.deleteRefreshTokenForUser(this._user.id);
  }

  async findUserByEmail(email: string) {
    return email
      ? await this.prisma.user.findFirst({ where: { email } })
      : null;
  }
}
