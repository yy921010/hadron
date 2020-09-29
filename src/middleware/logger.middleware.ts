import { Injectable, NestMiddleware } from '@nestjs/common';
import logger from '../config/log4js.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private log = logger.getLogger('http');

  use(req: any, res: any, next: () => void) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      this.log.error(logFormat);
    } else if (code >= 400) {
      this.log.warn(logFormat);
    } else {
      this.log.debug(logFormat);
    }
  }
}
