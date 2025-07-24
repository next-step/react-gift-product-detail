import type { ReactNode } from 'react';

interface WithApiUiProps<T> {
  data: T | T[] | null;
  error: boolean;
  loading?: ReactNode;
  errorFallback?: ReactNode;
  children: ReactNode;
}

const isEmpty = (data: unknown): boolean => {
  if (data === null) return true;
  if (Array.isArray(data)) return data.length === 0;
  return false;
};

const WithApiUi = <T,>({
  data,
  error,
  loading,
  errorFallback,
  children,
}: WithApiUiProps<T>) => {
  if (error) return <>{errorFallback}</>;
  if (isEmpty(data)) return <>{loading}</>;
  return <>{children}</>;
};

export default WithApiUi;
