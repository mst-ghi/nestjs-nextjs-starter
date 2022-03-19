import { ProfileEntity } from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileResponse {
  @ApiProperty({ type: ProfileEntity })
  profile: ProfileEntity;
}
