import { ErrorBoundary } from "@/components/ErrorBoundary";
import React, { type JSX } from "react";

export function withErrorBoundary<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
