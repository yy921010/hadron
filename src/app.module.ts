import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule } from './config/config.module';
import { MysqlModule } from './mysql';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot(['.env.yml', '.env.dev.yml', '.env.prod.yml']),
    MysqlModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('mysql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
