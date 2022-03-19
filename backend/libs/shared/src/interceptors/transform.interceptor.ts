import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        ...RemoveDoubleUnderscore(data),
      })),
    );
  }
}

const CleanLevelValue = 5;

export const RemoveDoubleUnderscore = (obj: any, level = 0) => {
  if (level <= CleanLevelValue && typeof obj == 'object') {
    Object.keys(obj).forEach(
      (key) =>
        (obj[key] &&
          typeof obj[key] === 'object' &&
          RemoveAction(obj, key) &&
          RemoveDoubleUnderscore(obj[key], level + 1)) ||
        (!obj[key] && RemoveAction(obj, key)),
    );
  }

  return obj;
};

export const RemoveAction = (obj: any, key: any) => {
  try {
    if (key.includes('__')) {
      Object.defineProperty(
        obj,
        key.replace(/__/g, ''),
        Object.getOwnPropertyDescriptor(obj, key),
      );
      delete obj[key];
    }
  } catch (error) {
    // console.log(obj);
  }
  return obj;
};
