import { throwNotFound, throwInternalServerError } from '@app/shared/errors';
import { PrismaService } from '@app/prisma';
import { MediaEntity } from '@app/prisma/entities';
import { BaseService } from '@app/shared';
import { throwBadRequest } from '@app/shared/errors';
import { Injectable, Req, Res } from '@nestjs/common';
import { MediaConfig } from './media.config';
import { MediaStorageEnum } from '@app/enums';
import { unlinkSync } from 'fs';

@Injectable()
export class MediaService extends BaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaConfig: MediaConfig,
  ) {
    super();
  }

  async s3Upload(request: any, response: any): Promise<MediaEntity> {
    let s3File: S3FileType = {};

    try {
      s3File = await this.s3UploadAction(request, response);
    } catch (error) {
      throw throwBadRequest();
    }

    if (s3File) {
      return await this.prisma.media.create({
        data: {
          user_id: this._userId,
          storage: MediaStorageEnum.S3,
          name: s3File.originalname,
          type: s3File.encoding,
          path: s3File.key,
          url: s3File.location,
          file_size: s3File.size,
        },
      });
    }
    throw throwBadRequest();
  }

  async localUpload(localFile: LocalFileType): Promise<MediaEntity> {
    return await this.prisma.media.create({
      data: {
        user_id: this._userId,
        storage: MediaStorageEnum.Local,
        name: localFile.originalname,
        type: localFile.encoding,
        path: localFile.path,
        url: localFile.path.substring(2),
        file_size: localFile.size,
      },
    });
  }

  async s3UploadAction(@Req() req: any, @Res() res: any) {
    return new Promise((resolve, reject) => {
      try {
        this.mediaConfig.createMulterS3Options(req, res, function (error: any) {
          if (error) {
            return reject(`Failed to upload image file: ${error}`);
          }

          resolve({ ...req.files[0] });
        });
      } catch (error) {
        return reject(`Failed to upload image file: ${error}`);
      }
    });
  }

  async delete(mediaId: number) {
    const media = await this.findByIdOrThrowException(mediaId);
    try {
      if (media.storage === 's3') {
        await this.s3Remove(media.path);
      } else if (media.storage === MediaStorageEnum.Local) {
        unlinkSync(media.path);
      }
      await this.prisma.media.delete({ where: { id: mediaId } });
    } catch (error) {
      throwInternalServerError('Deleting media encountered an error');
    }
  }

  async findByIdOrThrowException(id: number): Promise<MediaEntity> {
    const media = await this.prisma.media.findUnique({ where: { id } });

    if (!media) {
      throwNotFound('Media not found');
    }

    return media;
  }

  async s3Remove(key: string) {
    if (key) {
      return await this.mediaConfig.s3DeleteObject(key);
    }
  }
}
