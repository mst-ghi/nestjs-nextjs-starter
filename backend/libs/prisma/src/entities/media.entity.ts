import { ApiProperty } from '@nestjs/swagger';

export class MediaEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  storage: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  file_size: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  constructor(partial: Partial<MediaEntity>) {
    Object.assign(this, partial);
  }
}
