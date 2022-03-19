import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @MinLength(6)
  @MaxLength(191)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  current_password: string;

  @MinLength(6)
  @MaxLength(191)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  new_password: string;
}
