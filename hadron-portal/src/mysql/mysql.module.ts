import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { MysqlModuleAsyncOptions } from './mysql.interface';
import { MYSQL_CLIENT, MYSQL_CONFIG_OPTION } from './mysql.constants';
import * as Mysql from 'mysql';
import { PoolConfig } from 'mysql';

/**
 * 创建mysql实例
 */
const creatMysqlPool = (): Provider => {
  return {
    provide: MYSQL_CLIENT,
    useFactory: async (mysqlModuleConfig: PoolConfig) => {
      return Mysql.createPool(mysqlModuleConfig);
    },
    inject: [MYSQL_CONFIG_OPTION],
  };
};

const createAsyncMysqlOptions = (mysqlModuleAsyncOptions: MysqlModuleAsyncOptions): Provider => {
  return {
    provide: MYSQL_CONFIG_OPTION,
    useFactory: mysqlModuleAsyncOptions.useFactory,
    inject: mysqlModuleAsyncOptions.inject,
  };
};

@Module({
  providers: [MysqlService],
  exports: [MysqlService],
})
export class MysqlModule {
  static forRootAsync(mysqlModuleAsyncOptions: MysqlModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: MysqlModule,
      imports: mysqlModuleAsyncOptions.imports,
      providers: [creatMysqlPool(), createAsyncMysqlOptions(mysqlModuleAsyncOptions)],
      exports: [MysqlService],
    };
  }
}
