// components/PageWrapper.tsx
import { Suspense, type ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import EmptyMessage from './EmptyMessage';

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <ErrorBoundary
      fallback={
        <EmptyMessage minHeight="100vh">데이터 전송 오류 발생</EmptyMessage>
      }
    >
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
