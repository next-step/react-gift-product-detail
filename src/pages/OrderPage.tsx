import styled from '@emotion/styled';
import { Suspense } from 'react';
import Spinner from '@/components/common/Spinner';
import { ErrorBoundary } from '@/ErrorBoundary';

import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import OrderContent from '@/components/order/OrderContent';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.gray[200]};
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  background-color: #fff;
`;

export default function OrderPage() {
  return (
    <MobileLayout>
      <Wrapper>
        <NavBar />
        <ErrorBoundary fallback={<div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>}>
          <Suspense
            fallback={
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            }
          >
            <OrderContent />
          </Suspense>
        </ErrorBoundary>
      </Wrapper>
    </MobileLayout>
  );
}
