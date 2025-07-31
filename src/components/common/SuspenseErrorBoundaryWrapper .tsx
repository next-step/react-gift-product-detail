import { Suspense, type ReactNode } from 'react';
import EmptyMessage from './EmptyMessage';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // 로딩 중 대체 UI (기본은 LoadingSpinner)
  errorFallback?: ReactNode; // 에러 발생 시 대체 UI (기본은 EmptyMessage)
}

export default function SuspenseErrorBoundaryWrapper({
  children,
  fallback = <LoadingSpinner />,
  errorFallback = (
    <EmptyMessage minHeight="100%">오류가 발생했습니다.</EmptyMessage>
  ),
}: Props) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
