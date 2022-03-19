import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaConfig } from './media.config';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MediaConfig,
    }),
  ],
  providers: [MediaService, MediaConfig],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
