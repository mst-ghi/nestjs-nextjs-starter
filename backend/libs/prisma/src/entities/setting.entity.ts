import { ApiProperty } from '@nestjs/swagger';

export class SettingEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  key: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  default_value: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  sort: number;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  constructor(partial: Partial<SettingEntity>) {
    Object.assign(this, partial);
  }
}
