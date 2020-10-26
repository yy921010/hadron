import { Configuration, configure, Logger } from 'log4js';
import { ConfigService } from '../../core';

const configService = new ConfigService();
const log4jsConfig = configService.get('log4js') as Configuration;

export function getLogger(moduleName: string): Logger {
  return configure(log4jsConfig).getLogger(moduleName);
}
