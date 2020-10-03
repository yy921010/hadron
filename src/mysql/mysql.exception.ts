export enum ERROR_CODE {
  MYSQL_ERROR = 'mysql_100000',
}

export class MysqlException extends Error {
  private code: ERROR_CODE;
  constructor(code: ERROR_CODE, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
