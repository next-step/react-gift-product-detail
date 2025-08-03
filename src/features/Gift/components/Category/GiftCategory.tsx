import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import Loading from '@/components/Loading/Loading';
import * as S from './GiftCategory.styles';
import GiftCategoryGrid from './GiftCategoryGrid';

const GiftCategory = () => {
  return (
    <S.Container>
      <S.Title>선물 테마</S.Title>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <GiftCategoryGrid />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
};

export default GiftCategory;
