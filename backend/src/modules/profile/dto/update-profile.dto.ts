import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @Min(1)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  avatar_id: number;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  country_id: number;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  province_id: number;

  @MaxLength(195)
  @MinLength(2)
  @IsString()
  @IsOptional()
  @ApiProperty()
  city: string;

  @MaxLength(350)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @MaxLength(100, {
    each: true,
  })
  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  spoken_langs: string[];

  @MaxLength(100, {
    each: true,
  })
  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  tags: string[];

  @MaxLength(5000)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  about: string;
}
