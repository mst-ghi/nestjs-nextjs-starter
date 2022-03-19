import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRefreshException extends HttpException {
  constructor() {
    super(
      {
        success: false,
        message: 'Invalid token',
        errors: [],
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
