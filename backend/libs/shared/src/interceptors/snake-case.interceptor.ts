import { map } from 'rxjs/operators';
import { mapKeys, snakeCase } from 'lodash';
import { Observable } from 'rxjs';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class SnakeCaseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        const snakeCaseMapper = (val: any) => {
          return mapKeys(val, (_: any, k: any) => snakeCase(k));
        };

        if (typeof value == 'object' && value[0] !== undefined) {
          return value.map((v: any) => snakeCaseMapper(v));
        }

        return snakeCaseMapper(value);
      }),
    );
  }
}
