import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RefreshDto {
  @MinLength(120)
  @MaxLength(191)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refresh_token: string;

  @MinLength(120)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  old_access_token: string;
}
