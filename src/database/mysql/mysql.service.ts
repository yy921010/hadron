import { Inject, Injectable } from '@nestjs/common';
import { Global } from 'src/constants/global.constants';
import * as Mysql from 'mysql';
import { MysqlException } from '../exception/mysql.exception';
import { ErrorCode } from 'src/constants/error.code';
import { Log } from 'src/decorator/log.decorator';
import { Logger } from 'log4js';
import { ConfigService } from 'src/config/config/config.service';
@Log
@Injectable()
export class MysqlService {
  private dataBasePool: Mysql.Pool;
  private log: Logger;
  constructor(@Inject(Global.MYSQL_CONFIG_OPTION) entities = [], private readonly configService: ConfigService) {
    const mysqlConfig = configService.getConfigByName('mysql');
    this.dataBasePool = Mysql.createPool(mysqlConfig);
  }

  execSql(sqlStr: string, options?): Promise<any> {
    this.log.debug('[execSql] sql=', sqlStr);
    return new Promise((resolve, reject) => {
      this.dataBasePool.getConnection((error, connection) => {
        if (error) reject(error);
        if (options) {
          connection.query(sqlStr, options, (err, results, fields) => {
            if (err) reject(err);
            resolve(results);
            connection.release();
          });
        } else {
          connection.query(sqlStr, (err, results, fields) => {
            if (err) reject(err);
            resolve(results);
            connection.release();
          });
        }
      });
    }).catch(error => {
      throw new MysqlException(ErrorCode.MYSQL_ERROR, error);
    });
  }
}
