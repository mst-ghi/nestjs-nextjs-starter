import { SocialTypesEnum } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateSocialDto {
  @Max(100)
  @Min(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: SocialTypesEnum })
  type: SocialTypesEnum;

  @Max(250)
  @Min(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}
