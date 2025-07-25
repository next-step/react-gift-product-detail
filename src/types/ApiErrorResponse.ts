export interface ApiErrorData {
  status: string;
  statusCode: number;
  message: string;
}

export interface ApiErrorResponse {
  data: ApiErrorData;
}

export const isApiErrorResponse = (error: unknown): error is ApiErrorData => {
  return (
    typeof error === "object" && error !== null && "status" in error && "statusCode" in error && "message" in error
  );
};
