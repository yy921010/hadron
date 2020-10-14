import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { getLogger } from '../logger';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private log = getLogger('http');

  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode; // 响应状态码
    next();
    const accessLogFormat = `[${req.ip} ${req.method} ${code} ${req.originalUrl}]`;

    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      this.log.error(accessLogFormat, '[params=', req.params, '][query=', req.query, '][body=', req.body);
    } else if (code >= 400) {
      this.log.warn(accessLogFormat, '[params=', req.params, '][query=', req.query, '][body=', req.body);
    } else {
      this.log.debug(accessLogFormat, '[params=', req.params, '][query=', req.query, '][body=', req.body);
    }
  }
}
