import { ModuleMetadata } from '@nestjs/common';
import { PoolConfig } from 'mysql';

export interface MysqlModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<PoolConfig> | Promise<PoolConfig[]>;
  inject?: any[];
}
