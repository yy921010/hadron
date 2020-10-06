import { Logger } from 'log4js';
import {logger} from '../utils/logger'

export function Log<T extends { new (...args: any[]): any }>(constructor: T) {
  return class extends constructor {
    log: Logger = logger.getLogger(constructor.name);
  };
}
