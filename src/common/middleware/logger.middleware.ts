import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { getLogger } from '..';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private log = getLogger('http');

  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode; // 响应状态码
    next();
    this.log.info(
      `[${req.ip} ${req.method}  ${code}  ${req.url}] `,
      'params ->',
      req.params,
      'query ->',
      req.query,
      'body ->',
      req.body,
    );
  }
}
