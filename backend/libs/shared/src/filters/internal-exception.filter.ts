import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch(InternalServerErrorException)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      status_code: 500,
      success: false,
      message: 'Oops! The request encountered an error.',
      errors: [],
    });
  }
}
