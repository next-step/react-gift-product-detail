import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Navigation from '@/components/Navigation';
import CardSelector from '@/components/OrderSection/CardSelector';
import MessageInput from '@/components/OrderSection/MessageInput';
import SenderForm from '@/components/OrderSection/SenderForm';
import ReceiverForm from '@/components/ReceiverFormSection/ReceiverForm';
import ProductInfo from '@/components/OrderSection/ProductInfo';
import OrderSubmitButton from '@/components/OrderSection/OrderSubmitButton';
import { FormProvider } from 'react-hook-form';
import { useOrderForm } from '@/hooks/useOrderForm';
import type { OrderFormValues } from '@/types/order';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';
import { useProductSummary } from '@/hooks/useProductSummary';
import { useAuth } from '@/contexts/AuthContext';
import { useOrderMutation } from '@/hooks/useOrderMutation';
import { handleOrderSubmit } from '@/hooks/handlers/handleOrderSubmit';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, isLoading } = useProductSummary(id);

  const {
    methods,
    handleSubmit,
    handleCardChange,
    selectedCardId,
    totalPrice,
    totalQuantity,
  } = useOrderForm(product);

  const { authToken } = useAuth();
  const orderMutation = useOrderMutation();

  const onSubmit = (data: OrderFormValues) => {
    if (!product) return;

    handleOrderSubmit({
      data,
      product,
      selectedCardId,
      authToken: authToken ?? '',
      totalQuantity,
      navigate,
      mutateAsync: orderMutation.mutateAsync,
    });
  };

  if (isLoading) return loading;
  if (!product) return <div>{ERROR_MESSAGES.INVALID_ACCESS}</div>;

  return (
    <>
      <Navigation />
      <Main>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CardSelector
              selectedCardId={selectedCardId}
              onSelect={handleCardChange}
            />
            <MessageInput />
            <SenderForm />
            <ReceiverForm />
            <ProductInfo {...product} />
            <OrderSubmitButton amount={totalPrice} />
          </Form>
        </FormProvider>
      </Main>
    </>
  );
};

export default OrderPage;

const Main = styled.main`
  background-color: ${({ theme }) => theme.color.semantic.background.default};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[5]};
`;
