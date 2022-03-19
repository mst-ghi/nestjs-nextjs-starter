import { UserStatusEnum } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RefreshTokenEntity, RoleEntity, SocialEntity } from '.';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone_number?: string;

  @ApiProperty({ enum: UserStatusEnum })
  status: UserStatusEnum;

  @Exclude()
  password?: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  @ApiProperty({ type: [SocialEntity] })
  socials?: SocialEntity[];

  @ApiProperty({ type: [RoleEntity] })
  roles?: RoleEntity[];

  @Exclude()
  refreshTokens?: RefreshTokenEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
