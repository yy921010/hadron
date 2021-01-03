import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user';
import { LiveModule } from './live/live.module';
import { ConfigService, CoreModule } from './core';
import { LoggerMiddleware } from './common';
import { AuthModule } from './auth';
import { ImageModule } from './image/image.module';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from './oauth2/grpc-client.options';
import { MysqlModule } from './mysql2';
@Module({
  imports: [
    MysqlModule.forRootAsync({
      imports: [CoreModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get('mysql');
      },
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'OAUTH2_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
    // LiveModule,
    CoreModule,
    UserModule,
    // AuthModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
