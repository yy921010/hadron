import { DynamicModule, Module } from '@nestjs/common';
import { Global } from 'src/constants/global.constants';
import { MysqlService } from './mysql.service';

@Module({
  providers: [MysqlService],
})
export class MysqlModule {
  static forRoot(entities = []): DynamicModule {
    return {
      global: true,
      module: MysqlModule,
      providers: [
        {
          provide: Global.MYSQL_CONFIG_OPTION,
          useValue: entities,
        },
        MysqlService,
      ],
      exports: [MysqlService],
    };
  }
}
