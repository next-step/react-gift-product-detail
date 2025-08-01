import { Suspense, type ComponentType } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/common/ErrorFallback";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const ComponentWithSuspense = (props: P) => {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <WrappedComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  ComponentWithSuspense.displayName = `withSuspense(${displayName})`;

  return ComponentWithSuspense;
};
