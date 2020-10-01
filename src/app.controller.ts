import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Logger from './config/log4js.config';
import { MysqlException } from './database/exception/mysql.exception';
@Controller()
export class AppController {
  private log = Logger.getLogger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    this.log.info({
      user: 1,
    });
    this.log.debug('ssss');
    return await this.appService.getHello();
  }
}
