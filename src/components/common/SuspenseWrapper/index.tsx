import React, { Suspense } from 'react';
import * as S from './styles';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback: React.FC = () => (
  <S.LoadingContainer>
    <S.Spinner />
    <S.LoadingText>데이터를 불러오는 중...</S.LoadingText>
  </S.LoadingContainer>
);

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  fallback = <DefaultFallback />,
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default SuspenseWrapper;
