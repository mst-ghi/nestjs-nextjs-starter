import { ApiProperty } from '@nestjs/swagger';

export class UploadMediaDto {
  @ApiProperty()
  media: any;
}
