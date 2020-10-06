import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/any-exception.filter';
import { MicroserviceOptions } from '@nestjs/microservices';
import {microserviceOption} from './grpc.serve.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(microserviceOption)
  app.useGlobalFilters(new AllExceptionFilter());
  await app.startAllMicroservicesAsync();
}
bootstrap();
