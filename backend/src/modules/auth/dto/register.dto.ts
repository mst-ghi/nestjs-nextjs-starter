import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @MinLength(8)
  @MaxLength(128)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @MinLength(8)
  @MaxLength(191)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'your-password' })
  password: string;

  @MinLength(6)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Mostafa Gholami' })
  full_name: string;

  // @MinLength(100)
  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  // recaptcha: string;
}
