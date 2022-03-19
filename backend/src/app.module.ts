import {
  CacheModule,
  ClassSerializerInterceptor,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import configs from '@app/configs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '@app/shared';
import { PrismaModule } from '@app/prisma';

import { AuthModule } from './modules/auth/auth.module';
import { MediaModule } from './modules/media/media.module';
import { SettingsModule } from './modules/settings/settings.module';
import { CommonModule } from './modules/common/common.module';
import { CacheManagerService } from '@app/shared/cache/cache-manager.service';
import { CacheManagerModule } from '@app/shared/cache';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersModule } from './modules/users/users.module';
import { SocialsModule } from './modules/socials/socials.module';

const BaseImports = [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [configs],
  }),
  HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    }),
  }),
  CacheModule.register<RedisClientOptions>({
    store: redisStore,
    isGlobal: true,
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
    },
  }),
];

const BaseProviders = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
];

@Module({
  imports: [
    ...BaseImports,
    PrismaModule,
    CacheManagerModule,
    CommonModule,
    AuthModule,
    MediaModule,
    SettingsModule,
    ProfileModule,
    UsersModule,
    SocialsModule,
  ],
  providers: [...BaseProviders],
  controllers: [AppController],
})
export class AppModule {}
