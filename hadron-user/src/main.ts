import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/any-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {join} from 'path'
import LoggerClass from './decorator/log.decorator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger  = LoggerClass.getLogger(bootstrap.name)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user', // ['hero', 'hero2']
      protoPath: './src/user/user.proto', // ['./hero/hero.proto', './hero/hero2.proto']
    },
  })
  app.useGlobalFilters(new AllExceptionFilter());
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
  logger.info('user-module',`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
