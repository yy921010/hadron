import { Injectable } from '@nestjs/common';
import { MysqlService } from './database/mysql/mysql.service';

@Injectable()
export class AppService {
  constructor(private mySqlService: MysqlService) {}
  async getHello(): Promise<string> {
    await this.mySqlService.execSql('select * from t_b_client');
    return 'Hello World!';
  }
}
