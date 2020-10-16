import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, MyLoggerService } from './core';
import { AllExceptionFilter, getLogger } from './common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new MyLoggerService()
  });
  app.useGlobalFilters(new AllExceptionFilter());
  const config: any = app.get(ConfigService);
  await app.listen(config.ymlObject.hadron.port || 3000);
  return app
}
bootstrap().then(async(app)=>{
  const log = getLogger(bootstrap.name);
  log.info(`Start service is loading,server on ${await app.getUrl()}`);
});
