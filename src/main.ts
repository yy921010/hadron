import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GLOBAL_CONFIG_TOKEN } from './config';
import { AllExceptionFilter } from './filter/any-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  console.log(app.get(GLOBAL_CONFIG_TOKEN));
  await app.listen(3000);
}
bootstrap();
