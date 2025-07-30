import { BlankSpace, LoadingSpinner } from "@/components/common";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { MainPageErrorFallback } from "@/components/error/MainPageErrorFallback";
import {
  CardSelectorBar,
  OrderButton,
  OrderLayout,
  OrderProductInfoSection,
  ReceiverInfoSection,
  SelectedCardView,
  SenderInfoSection,
} from "@/components/order";
import { OrderProvider } from "@/contexts/order/OrderProvider";
import { OverlayProvider } from "@/contexts/overlay/OverlayProvider";
import { useOrderPageLogic } from "@/hooks/order/useOrderPageLogic";
import { useProductSummary } from "@/hooks/products";
import { Suspense } from "react";

const OrderPageContent = () => {
  const { product, productId, isLoading: ProductLoading } = useProductSummary();
  const { handleOrderSubmit, OrderLoading } = useOrderPageLogic();

  if (ProductLoading || OrderLoading) {
    return <LoadingSpinner />;
  }

  const onOrderSubmit = () => {
    handleOrderSubmit(productId, product?.name);
  };

  return (
    <OverlayProvider>
      <OrderLayout>
        <CardSelectorBar />
        <SelectedCardView />
        <BlankSpace />
        <SenderInfoSection />
        <BlankSpace />
        <ReceiverInfoSection />
        <BlankSpace />
        <OrderProductInfoSection product={product} />
        <OrderButton onClick={onOrderSubmit} productPrice={product?.price} />
      </OrderLayout>
    </OverlayProvider>
  );
};

export const OrderPage = () => {
  return (
    <OrderProvider>
      <ErrorBoundary
        fallback={reset => (
          <MainPageErrorFallback
            onRetry={() => {
              console.log("다시시도");
              reset();
            }}
            title="주문 정보를 불러올 수 없습니다."
          />
        )}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <OrderPageContent />
        </Suspense>
      </ErrorBoundary>
    </OrderProvider>
  );
};
