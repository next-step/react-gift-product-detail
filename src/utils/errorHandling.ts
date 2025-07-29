// 에러 처리 관련 타입 가드 함수들

/**
 * 에러 객체가 status 속성을 가지고 있는지 확인하는 타입 가드
 */
export function isErrorWithStatus(err: unknown): err is { status: number } {
  if (err === null || typeof err !== 'object') return false;
  
  const errorObj = err as Record<string, unknown>;
  return 'status' in errorObj && typeof errorObj.status === 'number';
}

/**
 * 에러 객체가 message 속성을 가지고 있는지 확인하는 타입 가드
 */
export function isErrorWithMessage(err: unknown): err is { message: string } {
  if (err === null || typeof err !== 'object') return false;
  
  const errorObj = err as Record<string, unknown>;
  return 'message' in errorObj && typeof errorObj.message === 'string';
}

/**
 * HTTP 에러 상태 코드가 클라이언트 에러(4XX)인지 확인
 */
export function isClientError(status: number): boolean {
  return status >= 400 && status < 500;
}

/**
 * HTTP 에러 상태 코드가 서버 에러(5XX)인지 확인
 */
export function isServerError(status: number): boolean {
  return status >= 500 && status < 600;
} 