import { UserEntity } from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponse {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}

export class MembersListResponse {
  @ApiProperty({ type: [UserEntity] })
  members: UserEntity[];
}

export class MentorsListResponse {
  @ApiProperty({ type: [UserEntity] })
  mentors: UserEntity[];
}
