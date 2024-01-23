export interface APIResponse<T> {
  errorMessages: string[];
  statusCode: number;
  result: T;
}
