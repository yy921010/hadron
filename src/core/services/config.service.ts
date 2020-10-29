import { Injectable } from '@nestjs/common';
import { appConfig } from "../../config/config.local";
@Injectable()
export class ConfigService {
  private ymlObject: any = appConfig;
  get(objectKey: string): unknown | string | number | any {
    if (this.ymlObject) {
      const hadronConfig = this.ymlObject.hadron;
      return hadronConfig[objectKey] || {};
    }
    return '';
  }
}
