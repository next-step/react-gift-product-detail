import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Suspense, type ComponentType } from "react";

const withSuspenseBoundary = <P extends object>(
  Component: ComponentType<P>,
  option: boolean = false,
) => {
  return (props: P) => {
    return (
      <ErrorBoundary redirect={option}>
        <Suspense fallback={<LoadingSpinner height="266px" />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
};

export default withSuspenseBoundary;
