import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { orders } from '@/entities/order/model/constants';
import { getProductSummary } from '@/entities/product/api/productApi';
import type { ProductSummary } from '@/entities/product/model/types';
import { useOrderForm } from '@/features/orderCreation/model/useOrderForm';
import { ErrorBoundary, Loading, RedirectOnError } from '@/shared/ui';
import OrderTemplate from '@/widgets/orderForm/ui/OrderTemplate';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/config/queryKeys';
import { ROUTES } from '@/shared/config';

const OrderContent = () => {
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = productId ? parseInt(productId, 10) : undefined;

  if (!numericProductId) {
    return null;
  }

  const { data } = useSuspenseQuery<ProductSummary>({
    queryKey: QUERY_KEYS.PRODUCT_SUMMARY(numericProductId),
    queryFn: () => getProductSummary(numericProductId),
  });

  const {
    cardState,
    formData,
    selectedCard,
    handleCardClick,
    handleMessageChange,
    handleSenderNameChange,
    handleOrder,
  } = useOrderForm({ product: data });

  return (
    <OrderTemplate
      orders={orders}
      cardState={cardState}
      selectedCard={selectedCard}
      onCardClick={handleCardClick}
      onMessageChange={handleMessageChange}
      formData={formData}
      onSenderNameChange={handleSenderNameChange}
      product={data}
      onSubmit={handleOrder}
    />
  );
};

const Order = () => {
  return (
    <ErrorBoundary fallback={<RedirectOnError to={`/${ROUTES.HOME}`} />}>
      <Suspense fallback={<Loading/>}>
        <OrderContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Order;
