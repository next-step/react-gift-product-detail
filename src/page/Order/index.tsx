import styled from '@emotion/styled';
import MessageCardSection from './components/MessageCardSection';
import MessageInput from './components/MessageInput';
import SenderInfo from './components/SenderInfo';
import ReceiverField from './components/ReceiverField';
import { FormProvider } from 'react-hook-form';
import toLocaleString from '@/utils/toLocaleString';
import ProductInfo from './components/ProductInfo';
import useOrderForm from './hooks/useOrderForm';
import { Suspense } from 'react';
import Loading from '@/components/common/Loading';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const OrderPage = () => {
  const { orderForm, onSubmit, price, productSummaryData } = useOrderForm();

  return (
    <ErrorBoundary fallback={<div>주문 페이지를 불러올 수 없습니다.</div>}>
      <Suspense fallback={<Loading />}>
        <Section>
          <FormProvider {...orderForm}>
            <form onSubmit={orderForm.handleSubmit(onSubmit)}>
              <MessageCardSection />
              <MessageInput />
              <SenderInfo />
              <ReceiverField />
              {productSummaryData && <ProductInfo productSummaryData={productSummaryData} />}
              <OrderButton type="submit">{toLocaleString(price)}원 주문하기</OrderButton>
            </form>
          </FormProvider>
        </Section>
      </Suspense>
    </ErrorBoundary>
  );
};

export default OrderPage;

const Section = styled.section`
  width: 100%;
  max-width: 720px;
  padding-bottom: 3.125rem;
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const OrderButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.brand.kakaoYellow};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle1Regular.fontWeight};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.semantic.brand.kakaoYellowPressed};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
