import { SocialTypesEnum } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '.';

export class SocialEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty({ enum: SocialTypesEnum })
  type: SocialTypesEnum | string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  constructor(partial: Partial<SocialEntity>) {
    Object.assign(this, partial);
  }
}
