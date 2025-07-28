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

const OrderPageContent = () => {
  const { product, handleOrderSubmit, isLoading, error } = useOrderPageLogic();

  if (isLoading || error) {
    return <LoadingSpinner />;
  }

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
        <OrderButton
          onClick={handleOrderSubmit}
          productPrice={product?.price}
        />
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
