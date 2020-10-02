import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'log4js';
import { MysqlException } from 'src/database/exception/mysql.exception';
import { Log } from 'src/decorator/log.decorator';
@Log
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private log: Logger;
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    if (exception instanceof MysqlException) {
      this.log.error(exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
