export interface ErrorData {
  status: string;
  statusCode: number;
  message: string;
}

export const isErrorData = (error: unknown): error is ErrorData => {
  return (
    typeof error === "object" && error !== null && "status" in error && "statusCode" in error && "message" in error
  );
};
