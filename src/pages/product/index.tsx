import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import ProductSummarySection from "./section/ProductInfoSection";
import ProductTabSection from "./section/ProductTabSection";
import ProductWishOrderFooterSection from "./section/ProductWishOrderFooterSection";

export default function ProductDetailPage() {
  return (
    <ErrorBoundary fallback={<div>~문제가 발생했습니다~</div>}>
      <ProductSummarySection />
      <ProductTabSection />
      <ProductWishOrderFooterSection />
    </ErrorBoundary>
  );
}
