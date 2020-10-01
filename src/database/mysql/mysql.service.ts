import { Inject, Injectable } from '@nestjs/common';
import { Global } from 'src/constants/global.constants';
import * as Mysql from 'mysql';
@Injectable()
export class MysqlService {
  private dataBasePool: Mysql.Pool;
  constructor(@Inject(Global.MYSQL_CONFIG_OPTION) entities = []) {
    this.dataBasePool = Mysql.createPool({
      user: '',
      password: '',
      host: '',
      database: '',
      port: 3306,
    });
    console.log('11', entities);
  }
}
