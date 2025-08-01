import { Suspense } from "react";
import type { ReactNode } from "react";
import { LoadingSpinner } from "@/components/SuspenseWrapper/SuspenseWrapper.style";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

const SuspenseWrapper: React.FC<Props> = ({ children, fallback }) => {
  const defaultFallback = (
    <LoadingSpinner>
      <div className="spinner" />
      <p>로딩 중</p>
    </LoadingSpinner>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
};

export default SuspenseWrapper;
