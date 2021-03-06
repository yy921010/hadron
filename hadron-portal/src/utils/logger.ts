import * as path from 'path';
import { Configuration, configure, Log4js, Logger } from 'log4js';


const logPath = path.join(__dirname, '../../logs');
const logConfig: Configuration = {
  appenders: {
    console: {
      type: 'console',
    },
    access: {
      type: 'dateFile',
      filename: `${logPath}/access/access.log`, // 日志文件名，会命名为：access.20200320.log
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExt: true,
    },
    app: {
      type: 'dateFile',
      filename: `${logPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      // maxLogSize: 10485760,
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${logPath}/errors/error.log`,
      alwaysIncludePattern: true,
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      // maxLogSize: 10485760,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['console', 'access'], level: 'DEBUG' },
  },
};
const logger:Log4js  = configure(logConfig);
export {logger}
