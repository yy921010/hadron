import { Controller, Get } from '@nestjs/common';
import { Log } from './decorator';
import { ConfigService } from './config';
import { Logger } from 'log4js';
@Log
@Controller()
export class AppController {
  private log:Logger;
  constructor(private readonly config:ConfigService) {}

  @Get()
  async getHello(): Promise<any> {
    return {
      version: this.config.get('version')
    };
  }
}
