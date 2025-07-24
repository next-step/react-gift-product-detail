import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Spinner } from "./Spinner";

const AsyncBoundary = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Spinner size={48} withWrapper />}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </Suspense>
);

export default AsyncBoundary;
