import { ApiProperty } from '@nestjs/swagger';

export class CityEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  country_id: number;

  @ApiProperty()
  province_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  constructor(partial: Partial<CityEntity>) {
    Object.assign(this, partial);
  }
}
