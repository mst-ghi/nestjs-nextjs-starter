import { SocialEntity } from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class SocialsListResponse {
  @ApiProperty({ type: [SocialEntity] })
  socials: SocialEntity[];
}

export class SocialResponse {
  @ApiProperty({ type: SocialEntity })
  social: SocialEntity;
}
