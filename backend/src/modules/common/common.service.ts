import { PrismaService } from '@app/prisma';
import {
  TagEntity,
  LanguageEntity,
  CountryEntity,
  ProvinceEntity,
  CityEntity,
} from '@app/prisma/entities';
import { CacheManagerService } from '@app/shared/cache/cache-manager.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheManagerService,
  ) {}

  async tagsList(): Promise<TagEntity[]> {
    let tags = await this.cache.ioGet<TagEntity[]>('Tags');
    if (!tags) {
      tags = await this.prisma.tag.findMany();
      await this.cache.ioSet('Tags', tags);
    }
    return tags;
  }

  async languagesList(): Promise<LanguageEntity[]> {
    let languages = await this.cache.ioGet<LanguageEntity[]>('Languages');
    if (!languages) {
      languages = await this.prisma.language.findMany();
      await this.cache.ioSet('Languages', languages);
    }
    return languages;
  }

  async countriesList(): Promise<CountryEntity[]> {
    return await this.prisma.country.findMany({ orderBy: { name: 'asc' } });
  }

  async provincesList(countryId: string): Promise<ProvinceEntity[]> {
    return await this.prisma.province.findMany({
      where: { country_id: parseInt(countryId) },
    });
  }

  async citiesList(provinceId: string): Promise<CityEntity[]> {
    return await this.prisma.city.findMany({
      where: { province_id: parseInt(provinceId) },
    });
  }
}
