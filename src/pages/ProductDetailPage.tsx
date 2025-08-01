import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseProductAllData } from '@/hooks/queries/useSuspenseProductAllDataQuery';
import { Spinner } from '@/components/common/Spinner';
import { ProductHero } from '@/components/product/ProductHero';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ProductFooter } from '@/components/product/ProductFooter';
import RootLayout from '@/layout/RootLayout';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <RootLayout><div>잘못된 상품 ID입니다.</div></RootLayout>;
  }

  return (
    <RootLayout>
      <ErrorBoundary fallback={<div>상품 정보를 불러오는 데 실패했습니다.</div>}>
        <Suspense fallback={<Spinner />}>
          <ProductDetailContent productId={Number(productId)} />
        </Suspense>
      </ErrorBoundary>
    </RootLayout>
  );
}

function ProductDetailContent({ productId }: { productId: number }) {
  const [productResult, productDetailResult, productReviewResult, productWishResult] =
    useSuspenseProductAllData(productId);

  const product = productResult.data;
  const productDetail = productDetailResult.data;
  const productReview = productReviewResult.data;
  const productWish = productWishResult.data;

  return (
    <>
      <ProductHero product={product} />
      <ProductTabs productDetail={productDetail} productReview={productReview} />
      <ProductFooter productWish={productWish} productId={productId} />
    </>
  );
}
