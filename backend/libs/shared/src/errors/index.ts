import { HttpException, HttpStatus } from '@nestjs/common';

export const throwForbidden = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      message:
        msg ||
        'Invalid authorization data specified in the request, or access to the requested resource is forbidden.',
    },
    HttpStatus.FORBIDDEN,
  );
};

export const throwUnAuthorized = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.UNAUTHORIZED,
      message: msg || 'Authorization data was not specified in the request',
    },
    HttpStatus.UNAUTHORIZED,
  );
};

export const throwBadRequest = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: msg || 'Bad Request',
    },
    HttpStatus.BAD_REQUEST,
  );
};

export const throwNotFound = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      message: msg || 'Not Found',
    },
    HttpStatus.NOT_FOUND,
  );
};

export const throwMethodNotAllowed = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.METHOD_NOT_ALLOWED,
      message: msg || 'Method is not allowed access',
    },
    HttpStatus.METHOD_NOT_ALLOWED,
  );
};

export const throwInternalServerError = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: msg || 'Internal server error',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};

export const throwServiceUnAvailable = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.SERVICE_UNAVAILABLE,
      message: msg || 'Service unavailable',
    },
    HttpStatus.SERVICE_UNAVAILABLE,
  );
};

export const throwUnprocessableEntity = (
  errors: { field: string; message: string }[] = [],
  msg: string | null = null,
) => {
  throw new HttpException(
    {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: msg || 'The submitted data is not valid',
      errors,
    },
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
};
