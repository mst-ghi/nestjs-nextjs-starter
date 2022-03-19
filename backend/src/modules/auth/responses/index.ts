import { UserEntity } from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}

export class RefreshResponse {
  @ApiProperty()
  tokens: JwtTokensType;
}

export class InitResponse {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}

export class LoginResponse {
  @ApiProperty()
  tokens: JwtTokensType;

  @ApiProperty()
  user: UserEntity;
}
