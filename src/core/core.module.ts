import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from './interceptors/excludeNull.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  providers: [
    ConfigService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ExcludeNullInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [ConfigService],
})
export class CoreModule {}
