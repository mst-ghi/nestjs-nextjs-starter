import { ApiSignature, JwtGuard, ReqUser } from '@app/decorators';
import { UserEntity, MediaEntity } from '@app/prisma/entities';

import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { UploadMediaDto } from './upload-media.dto';

import {
  Body,
  Controller,
  Param,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@ApiTags('media')
@Controller('media')
@JwtGuard()
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @ApiResponse({ status: 200, type: MediaEntity })
  @ApiSignature({
    method: 'POST',
    path: 's3',
    summary: `s3 upload media, Available mimes: [${process.env.MULTER_MEDIA_MIMES}]`,
  })
  async s3Upload(
    @Body() _: UploadMediaDto,
    @Req() request: any,
    @Res() response: any,
    @ReqUser() user: UserEntity,
  ) {
    return await this.service.user(user).s3Upload(request, response);
  }

  @ApiResponse({ status: 200, type: MediaEntity })
  @UseInterceptors(FilesInterceptor('media'))
  @ApiSignature({
    method: 'POST',
    path: 'local',
    summary: `local upload media, Available mimes: [${process.env.MULTER_MEDIA_MIMES}]`,
  })
  async localUpload(
    @Body() _: UploadMediaDto,
    @UploadedFile() file: LocalFileType,
    @ReqUser() user: UserEntity,
  ) {
    return await this.service.user(user).localUpload(file);
  }

  @ApiParam({ name: 'id', description: 'media id' })
  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get media details by id',
  })
  async details(@Param('id') id: number) {
    return await this.service.findByIdOrThrowException(id);
  }

  @ApiParam({ name: 'id', description: 'media id' })
  @ApiSignature({
    method: 'DELETE',
    path: '/:id',
    summary: 'delete exist media by id',
    disable: true,
  })
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
