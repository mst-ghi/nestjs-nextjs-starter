import { HttpException, HttpStatus } from '@nestjs/common';

export class UnActiveUserException extends HttpException {
  constructor() {
    super(
      {
        success: false,
        message: 'Your account is inactive',
        errors: [],
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
