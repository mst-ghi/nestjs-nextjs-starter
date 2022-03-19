import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@app/shared';
import { UpdateProfileDto } from './dto';
import { ProfileEntity } from '@app/prisma/entities';

@Injectable()
export class ProfileService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async updateProfile(dto: UpdateProfileDto) {
    await this.validateDtoRelation(dto);

    const data = {
      user_id: this._userId,
      country_id: dto.country_id,
      province_id: dto.province_id,
      city: dto.city,
      title: dto.title,
      spoken_langs: dto.spoken_langs,
      tags: dto.tags,
      about: dto.about,
    };

    if (dto.avatar_id) {
      data['avatar_id'] = dto.avatar_id;
    }

    const profile = await this.prisma.profile.upsert({
      where: { user_id: this._userId },
      update: data,
      create: data,
      include: {
        country: true,
        province: true,
        avatar: true,
      },
    });

    return this.partial(profile, ProfileEntity);
  }

  async validateDtoRelation(dto: UpdateProfileDto) {
    if (dto.avatar_id) {
      await this.prisma.findUniqueByIdOrThrow({
        model: 'media',
        id: dto.avatar_id,
        fieldError: { field: 'avatar_id', message: 'Avatar not found' },
      });
    }
    await this.prisma.findUniqueByIdOrThrow({
      model: 'country',
      id: dto.country_id,
      fieldError: { field: 'country_id', message: 'Country not found' },
    });
    await this.prisma.findUniqueByIdOrThrow({
      model: 'province',
      id: dto.province_id,
      fieldError: { field: 'province_id', message: 'Province not found' },
    });
  }
}
