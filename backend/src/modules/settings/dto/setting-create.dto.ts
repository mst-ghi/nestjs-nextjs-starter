import { SettingTypesEnum } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class SettingCreateDto {
  @Max(200)
  @Min(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  key: string;

  @Max(200)
  @Min(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @Max(200)
  @Min(6)
  @IsEnum({ enum: SettingTypesEnum })
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @Max(200)
  @Min(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  value: string;

  @Max(200)
  @Min(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  default_value: string;

  @Max(200)
  @Min(6)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  desc: string;

  @Max(99)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  sort: number;
}
