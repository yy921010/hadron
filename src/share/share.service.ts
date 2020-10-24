import { Injectable } from '@nestjs/common';
const ObjProto = Object.prototype;
const toString = ObjProto.toString,
  hasOwnProperty = ObjProto.hasOwnProperty;

@Injectable()
export class ShareService {
  isArray(anyOpt): boolean {
    return toString.call(anyOpt) === '[object Array]';
  }

  isString(obj): boolean {
    return toString.call(obj) === '[object String]';
  }

  isArguments(obj): boolean {
    return toString.call(obj) === '[object Arguments]';
  }
  has(obj, key: string) {
    return obj != null && hasOwnProperty.call(obj, key);
  }

  isEmpty(anyOpt: any): boolean {
    if (anyOpt == null) {
      return true;
    }
    if (this.isArray(anyOpt) || this.isString(anyOpt) || this.isArguments(anyOpt)) {
      return anyOpt.length === 0;
    }
    for (const key in anyOpt) {
      if (this.has(anyOpt, key)) {
        return false;
      }
    }
    return true;
  }
}
