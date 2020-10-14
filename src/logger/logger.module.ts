import { DynamicModule, Module, Provider } from '@nestjs/common';
import { LoggerEnum, LoggerModuleAsyncOptions } from './logger.interface';
import { LoggerService } from './logger.service';

const createLogger = (): Provider => {
  return {
    provide: LoggerEnum.LOGGER_CLIENT,
    useFactory: async () => {
      return '';
    },
    inject: [LoggerEnum.LOGGER_OPTION],
  };
};

const createAsyncLoggerOption = (loggerOption: LoggerModuleAsyncOptions): Provider => {
  return {
    provide: LoggerEnum.LOGGER_OPTION,
    useFactory: loggerOption.useFactory,
    inject: loggerOption.inject,
  };
};

@Module({
  providers: [LoggerService],
})
export class LoggerModule {
  static forRootAsync(loggerOption: LoggerModuleAsyncOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: loggerOption.imports,
      providers: [createLogger(), createAsyncLoggerOption(loggerOption)],
      exports: [LoggerService],
    };
  }
}
