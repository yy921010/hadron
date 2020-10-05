import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { Log } from './decorator';

@Injectable()
@Log
export class AppService {
  private log: Logger;
  async getHello(): Promise<string> {
    return 'hello world';
  }
}
