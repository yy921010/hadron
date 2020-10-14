import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { Log4j } from './logger';

@Injectable()
@Log4j
export class AppService {
  private logger: Logger;
  async getHello(): Promise<string> {
    return '';
  }
}
