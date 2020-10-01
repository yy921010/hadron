import { ErrorCode } from 'src/constants/error.code';

export class MysqlException extends Error {
  private code: ErrorCode;
  constructor(code: ErrorCode, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
