import { Suspense } from "react";
import type { ReactNode } from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { Spinner } from "@/components/common/Spinner";

interface AsyncBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

const AsyncBoundary = ({
  children,
  fallback = <Spinner withWrapper />,
  errorFallback,
  useErrorBoundary = true,
}: AsyncBoundaryProps & { useErrorBoundary?: boolean }) => {
  const content = (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );

  return useErrorBoundary ? (
    <ErrorBoundary fallback={errorFallback}>
      {content}
    </ErrorBoundary>
  ) : (
    content
  );
};


export default AsyncBoundary;