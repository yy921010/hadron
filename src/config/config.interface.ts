import { ModuleMetadata } from '@nestjs/common';

export interface ConfigModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<any> | Promise<any[]>;
  inject?: any[];
}
