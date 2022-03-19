import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      status_code: 413,
      success: false,
      message: 'You do not have enough access!',
      errors: [],
    });
  }
}
