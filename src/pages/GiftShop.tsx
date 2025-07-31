import styled from '@emotion/styled';
import { TopNavBar } from '@/components/shared/TopNavBar';
import { Category } from '@/components/gift_list_page/Category';
import { SelectFriend } from '@/components/gift_list_page/SelectFriend';
import { Banner } from '@/components/gift_list_page/Banner';
import { GiftList } from '@/components/gift_list_page/GiftList';
import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { setNavigator } from '@/utils/navigate';
import { keyframes } from '@emotion/react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 100vh;
  max-width: 720px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const ErrorText = styled.div`
  position: absolute;
  justify-self: center;
  align-self: center;
  font-size: 1rem;
  font-weight: 500;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  border: 0.2rem solid #ccc;
  border-top-color: ${({ theme }) => theme.colors.gray900};
  border-radius: 50%;
  margin: auto;
  animation: ${spin} 0.7s linear infinite;
`;

const GiftShop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <Container>
      <TopNavBar title="선물하기" mainPath="/" />
      <SelectFriend />
      <ErrorBoundary
        fallback={
          <ErrorText>⚠️ 요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</ErrorText>
        }
      >
        <Suspense fallback={<Spinner />}>
          <Category />
        </Suspense>
      </ErrorBoundary>
      <Banner />
      <ErrorBoundary
        fallback={
          <ErrorText>⚠️ 요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</ErrorText>
        }
      >
        <Suspense fallback={<Spinner />}>
          <GiftList />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default GiftShop;
