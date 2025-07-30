import { ErrorBoundary } from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import React, { Suspense, type JSX } from "react";

export function withAsyncBoundary<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner message="불러오는 중입니다..." />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}
