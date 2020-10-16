import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'log4js';
import { MongoError } from 'mongodb';
import { Log4j } from '..';

/**
 * 所有异常过滤器
 */
@Log4j
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger: Logger;

  catch(exception: HttpException | MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    this.logger.error(exception);
    if (exception instanceof HttpException) {
      response.status(status).json({
        error_code: status,
        path: request.url,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error_code: 400,
        error_message:'server error'
      });
    }
  }
}
