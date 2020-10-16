import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/any-exception.filter';
import { ConfigService } from './config';
import { getLogger } from './logger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  const config: any = app.get(ConfigService);
  await app.listen(config.ymlObject.hadron.port || 3000);
  const log = getLogger(bootstrap.name)
  log.info(` Start service ,server on ${await app.getUrl()} !!`)
}
bootstrap();
