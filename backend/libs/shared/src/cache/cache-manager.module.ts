import { Global, Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';
import { RedisProviders } from './redis/redis.providers';

@Global()
@Module({
  providers: [...RedisProviders, CacheManagerService],
  exports: [CacheManagerService],
})
export class CacheManagerModule {}
