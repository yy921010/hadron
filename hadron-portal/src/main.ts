import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/any-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {join} from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'hero', // ['hero', 'hero2']
      protoPath: join(__dirname, './hero/hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
    },
  })
  await app.listen(3000);
  app.useGlobalFilters(new AllExceptionFilter());

}
bootstrap();
