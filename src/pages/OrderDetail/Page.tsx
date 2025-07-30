import { useNavigate, useParams } from 'react-router';
import { OrderForm } from './components/Form';
import { useEffect } from 'react';
import { ROUTE_PATH } from '../Routes';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import { Spinner } from '@/components/common/Spinner';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify/unstyled';
import styled from '@emotion/styled';

const OrderDetailPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId || isNaN(Number(productId))) {
      navigate(ROUTE_PATH.HOME);
    }
  }, [productId, navigate]);

  return (
    <main>
      <AsyncBoundary
        pendingFallback={
          <LoadingWrapper>
            <Spinner size='large' color='kakaoBrown' />
          </LoadingWrapper>
        }
        onError={(error) => {
          if (error instanceof AxiosError) {
            const message = error.response?.data.data.message;
            if (message) {
              toast.error(message);
            }

            navigate(ROUTE_PATH.HOME);
          }
        }}
      >
        <OrderForm productId={productId} />
      </AsyncBoundary>
    </main>
  );
};

export default OrderDetailPage;

const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 2.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;
