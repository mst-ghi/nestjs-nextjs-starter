import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        success: false,
        message: 'Input information is not valid',
        errors: [],
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
