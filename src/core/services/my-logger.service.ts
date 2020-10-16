import { LoggerService } from '@nestjs/common';
import { getLogger } from '../../common';
export class MyLoggerService implements LoggerService{
  debug(message: any, context?: string): any {
    getLogger(context).info(message)
  }

  error(message: any, trace?: string, context?: string): any {
    getLogger(context).error(message)
  }

  log(message: any, context?: string): any {
    getLogger(context).info(message)
  }

  warn(message: any, context?: string): any {
    getLogger(context).info(message)
  }

}
