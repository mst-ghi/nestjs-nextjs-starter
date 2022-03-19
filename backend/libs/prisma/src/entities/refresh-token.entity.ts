import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserEntity } from './user.entity';

export class RefreshTokenEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  client_id: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  expires_at: Date;

  @Exclude()
  user?: UserEntity;

  constructor(partial: Partial<RefreshTokenEntity>) {
    Object.assign(this, partial);
  }
}
