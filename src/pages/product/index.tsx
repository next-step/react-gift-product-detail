import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import ProductSummarySection from "./section/ProductInfoSection";
import { Suspense } from "react";
import { Spinner } from "@/components/common/Spinner";

export default function ProductDetailPage() {
  return (
    <ErrorBoundary fallback={<div>~문제가 발생했습니다~</div>}>
      <Suspense fallback={<Spinner />}>
        <ProductSummarySection />
      </Suspense>
    </ErrorBoundary>
  );
}
