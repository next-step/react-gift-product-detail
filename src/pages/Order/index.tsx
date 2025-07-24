import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orders } from '@/entities/order/model/constants';
import { getProductSummary } from '@/entities/product/api/productApi';
import type { ProductSummary } from '@/entities/product/model/types';
import { useOrderForm } from '@/features/orderCreation/model/useOrderForm';
import { Loading, ErrorMessage } from '@/shared/ui';
import OrderTemplate from '@/widgets/orderForm/ui/OrderTemplate';
import { useQuery } from '@tanstack/react-query';
import type { AxiosErrorResponse } from '@/shared/types/api';

const Order = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery<ProductSummary>({
    queryKey: ['productSummary', productId],
    queryFn: () => getProductSummary(parseInt(productId!)),
    enabled: !!productId,
    retry: false,
  });

  useEffect(() => {
    if (error && (error as AxiosErrorResponse)?.response?.status === 400) {
      toast.error('현재 없는 상품입니다');
      navigate('/');
    }
  }, [error, navigate]);

  const {
    cardState,
    formData,
    errors,
    selectedCard,
    handleCardClick,
    handleMessageChange,
    handleSenderNameChange,
    handleOrder,
  } = useOrderForm({ product: data });

  if (isLoading) {
    return <Loading height="100vh" />;
  }

  if (isError) {
    return <ErrorMessage height="100vh" message="Error loading product." />;
  }

  if (!data) {
    return null;
  }

  return (
    <OrderTemplate
      orders={orders}
      cardState={cardState}
      selectedCard={selectedCard}
      onCardClick={handleCardClick}
      onMessageChange={handleMessageChange}
      formData={formData}
      onSenderNameChange={handleSenderNameChange}
      errors={errors}
      product={data}
      onSubmit={handleOrder}
    />
  );
};

export default Order;
