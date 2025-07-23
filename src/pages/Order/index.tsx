import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orders } from '@/entities/order/model/constants';
import { getProductSummary } from '@/entities/product/api/productApi';
import type { ProductSummary } from '@/entities/product/model/types';
import { useFetchState } from '@/shared/lib/hooks';
import { useOrderForm } from '@/features/orderCreation/model/useOrderForm';
import { Loading, ErrorMessage } from '@/shared/ui';
import { useErrorHandler } from '@/shared/lib/utils';
import OrderTemplate from '@/widgets/orderForm/ui/OrderTemplate';

const Order = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { fetchState, setLoading, setSuccess, setError } = useFetchState<ProductSummary | undefined>(undefined, true);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (!productId) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const productData = await getProductSummary(parseInt(productId));
        setSuccess(productData);
      } catch (error: unknown) {
        const customHandlers = {
          400: (message?: string) => {
            toast.error(message || '현재 없는 상품입니다');
            navigate('/');
          }
        };

        handleError(error, customHandlers);
        setError();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate, setLoading, setSuccess, setError, handleError]);

  const {
    cardState,
    formData,
    errors,
    selectedCard,
    handleCardClick,
    handleMessageChange,
    handleSenderNameChange,
    handleOrder,
  } = useOrderForm({ product: fetchState.data });

  if (fetchState.isLoading) {
    return <Loading height="100vh" />;
  }

  if (fetchState.isError) {
    return <ErrorMessage height="100vh" message="Error loading product." />;
  }

  if (!fetchState.data) {
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
      product={fetchState.data}
      onSubmit={handleOrder}
    />
  );
};

export default Order;
