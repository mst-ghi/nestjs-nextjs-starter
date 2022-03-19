/* eslint-disable @typescript-eslint/ban-types */
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Injectable } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { throwBadRequest } from '@app/shared/errors';

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class MediaConfig implements MulterOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      dest: this.config.get('multer.medias.path'),

      storage: diskStorage({
        destination: async (_: any, __: any, callback: Function) => {
          const path: string = this.config.get('multer.medias.path');
          if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
          return callback(null, path);
        },

        filename: (_: any, file: any, callback: Function) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const i = file.originalname.lastIndexOf('.');
          const ext = i < 0 ? '' : file.originalname.substr(i);
          return callback(null, `${randomName}${ext}`);
        },
      }),

      limits: {
        fileSize: this.config.get('multer.medias.size'),
      },

      fileFilter: (_, file, callback) => {
        const mimes = this.config.get('multer.medias.mimes');
        if (!mimes.includes(extname(file.originalname))) {
          return callback(throwBadRequest(), false);
        }
        return callback(null, true);
      },
    };
  }

  createMulterS3Options = multer({
    dest: this.config.get('multer.medias.path'),

    storage: multerS3({
      s3: s3,

      bucket: this.config.get<string>('aws.bucketName'),

      acl: this.config.get<string>('aws.acl'),

      key: function (_: any, file: any, cb: Function) {
        if (!file) throwBadRequest();

        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');

        const i = file.originalname.lastIndexOf('.');
        const ext = i < 0 ? '' : file.originalname.substr(i);

        cb(null, `${randomName}${ext}`);
      },
    }),

    limits: {
      fileSize: this.config.get('multer.medias.size'),
    },

    fileFilter: (_: any, file: any, callback: Function) => {
      const mimes = this.config.get('multer.medias.mimes');
      if (!mimes.includes(extname(file.originalname))) {
        return callback(throwBadRequest(), false);
      }
      return callback(null, true);
    },
  }).array('media', 1);

  async s3DeleteObject(Key: string) {
    return new Promise((resolve, reject) => {
      s3.deleteObject(
        { Bucket: this.config.get<string>('aws.bucketName'), Key },
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        },
      );
    });
  }
}
