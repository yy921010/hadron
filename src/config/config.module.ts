import { DynamicModule, Module } from '@nestjs/common';
import { Global } from 'src/constants/global.constants';
import { ConfigService } from './config.service';

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
          provide: Global.GLOBAL_CONFIG_TOKEN,
          useValue: ymlFiles,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
