import { Inject, Injectable } from '@nestjs/common';
import { Global } from 'src/constants/global.constants';
import * as fs from 'fs';
import * as YAML from 'yaml';
import LoggerClass from 'src/decorator/log.decorator';
import { Logger } from 'log4js';
@Injectable()
export class ConfigService {
  private log: Logger = LoggerClass.getLogger(ConfigService.name);
  private username: string;
  private ymlObject: any;

  constructor(@Inject(Global.GLOBAL_CONFIG_TOKEN) ymlFiles = []) {
    if (!this.ymlObject) {
      const ymlObjects =
        ymlFiles.map(item => {
          const ymlFile = fs.readFileSync(`./src/${item}`, 'utf8');
          return YAML.parse(ymlFile);
        }) || [];
      this.mergeObjectByProfile(ymlObjects);
    }
  }

  mergeObjectByProfile(ymlObjects: Array<any>) {
    if (ymlObjects.length > 0) {
      const defaultConfig = ymlObjects[0];
      const devConfig = ymlObjects[1];
      const prodConfig = ymlObjects[2];
      const defaultActiveKey = this.getMergeKey4Profile(defaultConfig);

      if (defaultActiveKey === this.getMergeKey4Profile(devConfig)) {
        this.ymlObject = Object.assign(defaultConfig, devConfig);
      }
      if (defaultActiveKey === this.getMergeKey4Profile(prodConfig)) {
        this.ymlObject = Object.assign(defaultConfig, prodConfig);
      }
    } else {
      this.log.info('[mergeObjectByProfile] this.ymlObject is exist!!');
    }
  }

  getMergeKey4Profile(defaultConfig): string {
    return defaultConfig?.hadron?.profile?.active || defaultConfig?.hadron?.profile;
  }

  getConfigByName(objectKey: string): unknown | string | number {
    if (this.ymlObject) {
      const hadronConfig = this.ymlObject.hadron;
      return hadronConfig[objectKey] || {};
    }
    return '';
  }
}
