import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from './interceptors/excludeNull.interceptor';

@Module({
  providers: [ConfigService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ExcludeNullInterceptor }
    ],
  exports: [ConfigService],
})
export class CoreModule {}
