import type { ReactNode } from 'react';

interface WithApiUiProps<T> {
  data: T | T[] | null;
  error: boolean;
  loading?: ReactNode;
  errorFallback?: ReactNode;
  emptyFallback?: ReactNode;
  emptyPredicate?: (data: T | T[] | null) => boolean;
  children: ReactNode;
}

const defaultIsEmpty = <T,>(data: T | T[] | null): boolean => {
  if (data === null) return false;
  if (Array.isArray(data)) return data.length === 0;
  return false;
};

const WithApiUi = <T,>({
  data,
  error,
  loading,
  errorFallback,
  emptyFallback,
  emptyPredicate = defaultIsEmpty,
  children,
}: WithApiUiProps<T>) => {
  if (error) return <>{errorFallback}</>;
  if (data === null) return <>{loading}</>;
  if (emptyPredicate(data)) return <>{emptyFallback}</>;
  return <>{children}</>;
};

export default WithApiUi;
