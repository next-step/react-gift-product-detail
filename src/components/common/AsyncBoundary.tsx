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
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;