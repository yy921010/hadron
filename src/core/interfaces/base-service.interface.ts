export interface BaseServiceInterface<T> {
  find(): Promise<T>;
  find(id: string): Promise<T>;
  find(pageNumber: number, pageSize: number): Promise<T>;
  log(message: any, context?: string): any;
}
