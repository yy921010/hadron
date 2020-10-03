import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { Log } from './decorator/log.decorator';
import { MysqlService } from './mysql';

@Injectable()
@Log
export class AppService {
  private log: Logger;
  constructor(private mySqlService: MysqlService) {}
  async getHello(): Promise<string> {
    const aaaa = await this.mySqlService.execSql('select client_id as clientId from tf_b_client');
    const a = aaaa.map(item => {
      return item.clientId;
    });
    this.log.info('aaaaa', a);
    return aaaa;
  }
}
