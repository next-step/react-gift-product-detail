import { BlankSpace, LoadingSpinner } from "@/components/common";
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
      <OrderPageContent />
    </OrderProvider>
  );
};
