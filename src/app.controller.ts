import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Logger from './config/log4js.config';
@Controller()
export class AppController {
  private log = Logger.getLogger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.log.info({
      user: 1,
    });
    this.log.debug('ssss');
    this.log.error('cccc');
    return this.appService.getHello();
  }
}
