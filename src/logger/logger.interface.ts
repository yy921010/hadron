import { ModuleMetadata } from '@nestjs/common';

export interface LoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<any> | Promise<any[]>;
  inject?: any[];
}

export enum LoggerEnum {
  LOGGER_OPTION = 'LOGGER_OPTION',
  LOGGER_CLIENT = 'LOGGER_CLIENT',
}
