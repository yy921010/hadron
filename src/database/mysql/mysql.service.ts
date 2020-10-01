import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Global } from 'src/constants/global.constants';
import * as Mysql from 'mysql';
import Logger from '../../config/log4js.config';
import { MysqlException } from '../exception/mysql.exception';
import { ErrorCode } from 'src/constants/error.code';
@Injectable()
export class MysqlService {
  private dataBasePool: Mysql.Pool;
  private log = Logger.getLogger(MysqlService.name);
  constructor(@Inject(Global.MYSQL_CONFIG_OPTION) entities = []) {
    this.dataBasePool = Mysql.createPool({
      user: 'root',
      password: '12345678',
      host: 'localhost',
      database: 'tomokotv_dev',
      port: 3306,
    });
    console.log('11', entities);
  }

  execSql(sqlStr: string, options?): Promise<any> {
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
