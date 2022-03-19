import { Provider } from '@nestjs/common';
import * as Redis from 'ioredis';

import {
  REDIS_PUBLISHER_CLIENT,
  REDIS_SUBSCRIBER_CLIENT,
  REDIS_IO,
} from './redis.constants';

export const RedisProviders: Provider[] = [
  {
    useFactory: () => {
      return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      });
    },
    provide: REDIS_SUBSCRIBER_CLIENT,
  },
  {
    useFactory: () => {
      return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      });
    },
    provide: REDIS_PUBLISHER_CLIENT,
  },
  {
    useFactory: () => {
      return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      });
    },
    provide: REDIS_IO,
  },
];
