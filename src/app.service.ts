import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { MysqlService } from './database/mysql/mysql.service';
import { Log } from './decorator/log.decorator';

@Injectable()
@Log
export class AppService {
  private log: Logger;
  constructor(private mySqlService: MysqlService) {}
  async getHello(): Promise<string> {
    const aaaa = await this.mySqlService.execSql('select * from tf_b_client');
    this.log.info('aaaaa', aaaa);
    return aaaa;
  }
}
