import { ApiProperty } from '@nestjs/swagger';
import { CityEntity } from './city.entity';

export class ProvinceEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  country_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  @ApiProperty({ type: [CityEntity], required: false, nullable: true })
  cities?: CityEntity[];

  constructor(partial: Partial<ProvinceEntity>) {
    Object.assign(this, partial);
  }
}
