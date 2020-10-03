import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { GLOBAL_CONFIG_TOKEN } from './config.constants';

@Module({
  providers: [ConfigService],
})
export class ConfigModule {
  static forRoot(ymlFiles = []): DynamicModule {
    return {
      global: true,
      module: ConfigModule,
      providers: [
        {
          provide: GLOBAL_CONFIG_TOKEN,
          useValue: ymlFiles,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
