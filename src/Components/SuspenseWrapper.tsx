import React, { Suspense, type ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  message?: string;
}

const SuspenseWrapper = ({ 
  children, 
  fallback, 
  message = "로딩 중..." 
}: SuspenseWrapperProps) => {
  return (
    <Suspense fallback={fallback || <LoadingSpinner message={message} />}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper; 