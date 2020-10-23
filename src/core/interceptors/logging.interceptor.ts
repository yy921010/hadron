import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getLogger } from '../../common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private log = getLogger('http');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(tap(() => this.log.info(`[waste time] -> ${Date.now() - now}ms`)));
  }
}
