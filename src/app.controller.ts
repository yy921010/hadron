import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MysqlException } from './database/exception/mysql.exception';
import { Log } from './decorator/log.decorator';
@Log
@Controller()
export class AppController {
  private log;
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    this.log();
    return await this.appService.getHello();
  }
}
