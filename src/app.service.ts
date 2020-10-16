import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { Log4j } from './common';

@Injectable()
@Log4j
export class AppService {
  private logger: Logger;
  async getHello(): Promise<string> {
    return '';
  }
}
