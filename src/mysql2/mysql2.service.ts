import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { MYSQL_CLIENT } from './mysql2.constants';
import { MysqlException } from './mysql2.exception';
import { Logger } from 'log4js';
import { getLogger } from '../common';
import * as sqlFormatter from 'sql-formatter';

@Injectable()
export class MysqlService {
  private logger: Logger = getLogger(MysqlService.name);

  constructor(@Inject(MYSQL_CLIENT) private readonly mysqlPool: Pool) {}
  async execute(sqlStr: string, options?): Promise<any> {
    this.logger.debug('[MysqlService] sql ==> \n', sqlFormatter.format(sqlStr));
    const conn = await this.mysqlPool.getConnection().catch(resp => {
      throw new MysqlException(resp.message);
    });
    let result = null;
    if (options) {
      result = await conn.query(sqlStr, options).catch(resp => {
        throw new MysqlException(resp.message);
      });
      conn.release();
    } else {
      result = await conn.query(sqlStr).catch(resp => {
        throw new MysqlException(resp.message);
      });
      conn.release();
    }
    return result;
  }
}
