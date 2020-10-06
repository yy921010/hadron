import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/any-exception.filter';
import {logger} from './utils/logger'

async function bootstrap() {
  const log = logger.getLogger(bootstrap.name)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.useGlobalFilters(new AllExceptionFilter());
  log.info(`hadron-portal service is started,listen on ${await app.getUrl()}`)
}
bootstrap();
