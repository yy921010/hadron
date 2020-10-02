import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MysqlModule } from './database/mysql/mysql.module';
import { ConfigModule } from './config/config/config.module';

@Module({
  imports: [MysqlModule.forRoot([]), ConfigModule.forRoot(['.env.yml', '.env.dev.yml', '.env.prod.yml'])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
