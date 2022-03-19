import { SettingUpdateDto } from './dto/setting-update.dto';
import { throwNotFound, throwUnprocessableEntity } from '@app/shared/errors';
import { PrismaService } from '@app/prisma';
import { SettingEntity } from '@app/prisma/entities';
import { BaseService } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { SettingCreateDto } from './dto';

@Injectable()
export class SettingsService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async list(): Promise<SettingEntity[]> {
    return await this.prisma.setting.findMany();
  }

  async create(dto: SettingCreateDto): Promise<SettingEntity> {
    const existSetting = await this.findByKey(dto.key);
    if (existSetting) {
      throwUnprocessableEntity([
        {
          field: 'key',
          message: 'Setting exist by this key:' + dto.key,
        },
      ]);
    }
    return await this.prisma.setting.create({
      data: dto,
    });
  }

  async update(
    dto: SettingUpdateDto,
    settingId: number,
  ): Promise<SettingEntity> {
    await this.findByIdOrThrowException(settingId);
    return await this.prisma.setting.update({
      where: { id: settingId },
      data: dto,
    });
  }

  async findByIdOrThrowException(id: number): Promise<SettingEntity> {
    const setting = await this.prisma.setting.findFirst({ where: { id } });
    if (!setting) {
      throwNotFound('Setting not found');
    }
    return setting;
  }

  async findByKey(key: string): Promise<SettingEntity> {
    return await this.prisma.setting.findFirst({ where: { key } });
  }
}
