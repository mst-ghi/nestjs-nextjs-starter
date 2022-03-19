import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ProvinceEntity } from './province.entity';

export class CountryEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  iso2: string;

  @ApiProperty()
  iso3: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  numeric_code: string | null;

  @ApiProperty()
  phone_code: string | null;

  @ApiProperty()
  capital: string | null;

  @ApiProperty()
  currency: string | null;

  @ApiProperty()
  currency_name: string | null;

  @ApiProperty()
  currency_symbol: string | null;

  @ApiProperty()
  tld: string | null;

  @ApiProperty()
  native: string | null;

  @ApiProperty()
  region: string | null;

  @ApiProperty()
  timezones: Prisma.JsonValue | null;

  @ApiProperty()
  translations: Prisma.JsonValue | null;

  @ApiProperty()
  emoji: string | null;

  @ApiProperty()
  emojiU: string | null;

  @ApiProperty()
  wiki_data_id: string | null;

  @ApiProperty()
  latitude: number | null;

  @ApiProperty()
  longitude: number | null;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  @ApiProperty({ type: [ProvinceEntity], required: false, nullable: true })
  provinces?: ProvinceEntity[];

  constructor(partial: Partial<CountryEntity>) {
    Object.assign(this, partial);
  }
}
