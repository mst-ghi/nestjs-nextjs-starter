import { HttpException, HttpStatus } from '@nestjs/common';

export class UnAuthenticationException extends HttpException {
  constructor() {
    super(
      {
        success: false,
        message: 'You are not logged in',
        errors: [],
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
