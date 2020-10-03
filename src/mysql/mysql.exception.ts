export enum ERROR_CODE {
  MYSQL_ERROR = 'mysql_100000',
}

export class MysqlException extends Error {
  private  error_code: ERROR_CODE;
  private  error_message
  constructor(code1: ERROR_CODE, message1: string) {
    super();
    this.error_code = code1;
    this.error_message = message1;
  }
}
