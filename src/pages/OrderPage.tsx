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
import { useRouter } from "@/hooks/common/useRouter";
import { useOrderPageLogic } from "@/hooks/order/useOrderPageLogic";
import { useProductSummary } from "@/hooks/products";
import { queryKeys } from "@/lib/query-keys";
import { queryClient } from "@/query-client";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

const OrderPageContent = () => {
  const { product, productId } = useProductSummary();
  const { handleOrderSubmit, OrderLoading } = useOrderPageLogic();

  if (OrderLoading) {
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
  const { goHomePage, goLoginPage } = useRouter();
  const { id } = useParams<{ id: string }>();
  const handleProductSummaryRetry = () => {
    if (id) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.summary(Number(id)),
      });
    }
  };
  return (
    <OrderProvider>
      <ErrorBoundary
        fallback={reset => (
          <MainPageErrorFallback
            onRetry={() => {
              handleProductSummaryRetry();
              reset();
            }}
            title="상품 정보를 불러올 수 없습니다."
          />
        )}
        onUnauthorized={() => goLoginPage({ redirect: true })}
        onClientError={() => goHomePage()}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <OrderPageContent />
        </Suspense>
      </ErrorBoundary>
    </OrderProvider>
  );
};
