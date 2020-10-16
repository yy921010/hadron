import { Controller, Get } from '@nestjs/common';
import { Logger } from 'log4js';
import { Log4j } from './common';
import { ConfigService } from './core';

@Controller()
@Log4j
export class AppController {
  private logger: Logger;
  constructor(private readonly config: ConfigService) {}

  @Get()
  async getHello(): Promise<any> {
    return {
      version: this.config.get('version'),
    };
  }
}
