export interface ApiErrorData {
  status: string;
  statusCode: number;
  message: string;
}

export interface ApiErrorResponse {
  data: ApiErrorData;
}
