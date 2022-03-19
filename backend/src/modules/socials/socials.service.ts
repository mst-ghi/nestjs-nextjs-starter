import {
  throwBadRequest,
  throwNotFound,
  throwUnprocessableEntity,
} from '@app/shared/errors';
import { PrismaService } from '@app/prisma';
import { SocialEntity } from '@app/prisma/entities';
import { BaseService } from '@app/shared';
import { SocialsUtils } from '@app/shared/socials';
import { Injectable } from '@nestjs/common';
import { CreateSocialDto, UpdateSocialDto } from './dto';
import { SocialTypesEnum } from '@app/enums';
import { isEmail } from 'class-validator';

@Injectable()
export class SocialsService extends BaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: SocialsUtils,
  ) {
    super();
  }

  async list(): Promise<SocialEntity[]> {
    return await this.prisma.social.findMany({
      where: { user_id: this._userId },
    });
  }

  async create(dto: CreateSocialDto): Promise<SocialEntity> {
    this.validateEmail(dto.type, dto.username);
    try {
      return await this.prisma.social.create({
        data: {
          user_id: this._userId,
          type: dto.type,
          username: this.utils.sanitizeLink(dto.type, dto.username),
        },
      });
    } catch (error) {
      throwBadRequest();
    }
  }

  async update(socialId: number, dto: UpdateSocialDto): Promise<SocialEntity> {
    await this.validationById(socialId);
    this.validateEmail(dto.type, dto.username);
    try {
      return await this.prisma.social.update({
        where: { id: socialId },
        data: {
          type: dto.type,
          username: this.utils.sanitizeLink(dto.type, dto.username),
        },
      });
    } catch (error) {
      throwBadRequest();
    }
  }

  async delete(socialId: number) {
    await this.validationById(socialId);
    await this.prisma.social.delete({ where: { id: socialId } });
  }

  validateEmail(type: string, username) {
    if (type === SocialTypesEnum.Email && !isEmail(username)) {
      throwUnprocessableEntity([
        {
          field: 'username',
          message: 'Email is not valid',
        },
      ]);
    }
  }

  async validationById(socialId: number) {
    const social: SocialEntity = await this.prisma.findUniqueByIdOrThrow({
      model: 'social',
      id: socialId,
    });

    if (social.user_id !== this._userId) {
      throwNotFound('Social not found');
    }

    return social;
  }
}
