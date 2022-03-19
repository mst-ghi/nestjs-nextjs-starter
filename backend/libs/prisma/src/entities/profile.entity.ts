import { ApiProperty } from '@nestjs/swagger';
import { CountryEntity, MediaEntity, ProvinceEntity, UserEntity } from '.';

export class ProfileEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  avatar_id: number;

  @ApiProperty()
  country_id: number;

  @ApiProperty()
  province_id: number;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  about?: string;

  @ApiProperty({ type: [String] })
  spoken_langs?: string[];

  @ApiProperty({ type: [String] })
  tags?: string[];

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  @ApiProperty({ type: UserEntity, required: false })
  user: UserEntity;

  @ApiProperty({ type: MediaEntity, required: false })
  avatar: MediaEntity;

  @ApiProperty({ type: CountryEntity, required: false })
  country: CountryEntity;

  @ApiProperty({ type: ProvinceEntity, required: false })
  province: ProvinceEntity;

  constructor(partial: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }
}
