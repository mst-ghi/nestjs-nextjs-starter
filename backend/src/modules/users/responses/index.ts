import { UserEntity } from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponse {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}

export class PeoplesListResponse {
  @ApiProperty({ type: [UserEntity] })
  peoples: UserEntity[];
}
