import { ApiProperty } from '@nestjs/swagger';

export class LanguageEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  key: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  constructor(partial: Partial<LanguageEntity>) {
    Object.assign(this, partial);
  }
}
