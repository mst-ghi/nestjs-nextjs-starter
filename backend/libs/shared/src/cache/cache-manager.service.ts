import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';
import { REDIS_IO } from './redis/redis.constants';

@Injectable()
export class CacheManagerService {
  constructor(
    @Inject(CACHE_MANAGER) private manager: Cache,
    @Inject(REDIS_IO)
    private readonly redisIo,
  ) {}

  async managerGet<T>(key: CacheManagerKeysType): Promise<T> {
    return await this.manager.get(key);
  }

  async managerDel(key: CacheManagerKeysType): Promise<any> {
    return await this.manager.del(key);
  }

  async managerSet<T>(
    key: CacheManagerKeysType,
    value: T,
    configs?: CachingConfig,
  ): Promise<T> {
    return await this.manager.set(key, value, configs);
  }

  async ioGet<T>(key: CacheManagerKeysType): Promise<T> {
    return JSON.parse(
      await this.redisIo.get(key, (err, result) => {
        if (err) {
          Logger.error(
            `fetch value of ${key} is failed`,
            'CacheManagerService',
          );
        } else {
          return result;
        }
      }),
    );
  }

  async ioSet<T>(key: CacheManagerKeysType, value: T): Promise<any> {
    return await this.redisIo.set(key, JSON.stringify(value));
  }
}
