import { HttpException, HttpStatus } from '@nestjs/common';

export class UserInactiveException extends HttpException {
  constructor() {
    super(
      {
        success: false,
        message:
          'You are disabled in the system for obvious reasons. Please contact the relevant expert',
        errors: [],
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
