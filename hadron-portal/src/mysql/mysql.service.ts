import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql';
import { ERROR_CODE, MysqlException } from './mysql.exception';
import { Log } from 'src/decorator/log.decorator';
import { Logger } from 'log4js';
import { MYSQL_CLIENT } from './mysql.constants';

@Log
@Injectable()
export class MysqlService {
  private log: Logger;
  constructor(@Inject(MYSQL_CLIENT) private readonly mysqlPool: Pool) {}

  execSql(sqlStr: string, options?): Promise<any> {
    this.log.debug('[execSql] sql=', sqlStr);
    return new Promise((resolve, reject) => {
      this.mysqlPool.getConnection((error, connection) => {
        if (error) reject(error);
        if (options) {
          connection.query(sqlStr, options, (err, results) => {
            if (err) reject(err);
            resolve(results);
            connection.release();
          });
        } else {
          connection.query(sqlStr, (err, results) => {
            if (err) reject(err);
            resolve(results);
            connection.release();
          });
        }
      });
    }).catch(error => {
      throw new MysqlException(ERROR_CODE.MYSQL_ERROR, error);
    });
  }
}
