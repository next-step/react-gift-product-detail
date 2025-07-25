import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import ProductSummarySection from "./section/ProductInfoSection";
import { Suspense } from "react";
import { Spinner } from "@/components/common/Spinner";
import ProductTabSection from "./section/ProductTabSection";

export default function ProductDetailPage() {
  return (
    <ErrorBoundary fallback={<div>~문제가 발생했습니다~</div>}>
      <Suspense fallback={<Spinner />}>
        <>
          <ProductSummarySection />
          <ProductTabSection />
          {/* <ProductWishOrderFooter /> */}
        </>
      </Suspense>
    </ErrorBoundary>
  );
}
