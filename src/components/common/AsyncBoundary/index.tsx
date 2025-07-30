import { forwardRef, Suspense, type ComponentProps, type SuspenseProps } from 'react';
import type { ErrorBoundaryProps } from '../ErrorBoundary';
import ErrorBoundary from '../ErrorBoundary';

export type AsyncBoundaryProps = Omit<SuspenseProps, 'fallback'> &
  Omit<ErrorBoundaryProps, 'fallback'> & {
    rejectedFallback?: ComponentProps<typeof ErrorBoundary>['fallback'];
    onError?: ComponentProps<typeof ErrorBoundary>['onError'];
    pendingFallback?: ComponentProps<typeof Suspense>['fallback'];
  };

const AsyncBoundary = forwardRef(
  ({ pendingFallback, rejectedFallback, children, onError }: AsyncBoundaryProps) => {
    return (
      <ErrorBoundary fallback={rejectedFallback ?? <></>} onError={onError}>
        <Suspense fallback={pendingFallback ?? <></>}>{children}</Suspense>
      </ErrorBoundary>
    );
  },
);

export default AsyncBoundary;
