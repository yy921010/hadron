import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user';
import { MongooseModule } from '@nestjs/mongoose';
import { LiveModule } from './live/live.module';
import { ConfigService, CoreModule } from './core';
import { LoggerMiddleware } from './common';
import { ShareModule } from './share/share.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [CoreModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get('mongo');
      },
      inject: [ConfigService],
    }),
    LiveModule,
    ShareModule,
    CoreModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
