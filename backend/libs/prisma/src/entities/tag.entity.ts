import { ApiProperty } from '@nestjs/swagger';

export class TagEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  key: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  constructor(partial: Partial<TagEntity>) {
    Object.assign(this, partial);
  }
}
