import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config';
import { Log4j } from './logger';
import { Logger } from 'log4js';

@Controller()
@Log4j
export class AppController {
  private logger: Logger;
  constructor(private readonly config: ConfigService) {}

  @Get()
  async getHello(): Promise<any> {
    this.logger.debug('sssss');
    return {
      version: this.config.get('version'),
    };
  }
}
