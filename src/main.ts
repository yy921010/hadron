import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/any-exception.filter';
import { ConfigService } from './config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  const configService: any = app.get(ConfigService);
  await app.listen(configService.ymlObject.port);
}
bootstrap();
