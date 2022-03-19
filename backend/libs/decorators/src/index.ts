import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/guards';
import {
  applyDecorators,
  createParamDecorator,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Version,
  HttpCode,
} from '@nestjs/common';

export const Id = () => Param('id', new ParseIntPipe());

export const Ip = createParamDecorator((_, req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});

export function JwtGuard() {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}

export const ReqUser = createParamDecorator((data: string, req) => {
  return data
    ? req['args'][0].user && req['args'][0].user[data]
    : req['args'][0].user;
});

export function ApiSignature({
  method = 'GET',
  path = '',
  version = '1',
  status = 200,
  disable = false,
  isPagination = false,
  summary,
}: ApiSignatureType) {
  let nestMethod = Get;

  switch (method) {
    case 'POST':
      nestMethod = Post;
      break;
    case 'PUT':
      nestMethod = Put;
      break;
    case 'DELETE':
      nestMethod = Delete;
      break;
    default:
      break;
  }

  if (disable) {
    return applyDecorators();
  }

  if (isPagination) {
    return applyDecorators(
      nestMethod(path),
      Version(version),
      HttpCode(status),
      ApiOperation({ summary }),
      ApiQuery({
        name: 'take',
        description: 'The number of items you want to fetched',
      }),
      ApiQuery({
        name: 'cursor',
        description: 'id as cursor query',
        required: false,
      }),
    );
  }

  return applyDecorators(
    nestMethod(path),
    Version(version),
    HttpCode(status),
    ApiOperation({ summary }),
  );
}
