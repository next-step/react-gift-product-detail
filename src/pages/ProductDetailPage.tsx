import { useParams } from 'react-router-dom';
import { useProductAllData } from '@/hooks/queries/useProductAllDataQuery';
import { Spinner } from '@/components/common/Spinner';
import { ProductHero } from '@/components/product/ProductHero';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ProductFooter } from '@/components/product/ProductFooter';
import RootLayout from '@/layout/RootLayout';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);

  const results = useProductAllData(numericProductId);

  const isLoading = results.some((result) => result.isLoading);
  if (isLoading) {
    return (
      <RootLayout>
        <Spinner />
      </RootLayout>
    );
  }

  const isError = results.some((result) => result.isError);
  if (isError || !numericProductId) {
    return <RootLayout><div>상품 정보를 불러오는 데 실패했습니다.</div></RootLayout>;
  }

  const [productResult, productDetailResult, productReviewResult, productWishResult] = results;

  // 모든 쿼리가 성공적으로 완료되었고 데이터가 존재하는지 확인
  if (
    !productResult.data ||
    !productDetailResult.data ||
    !productReviewResult.data ||
    !productWishResult.data
  ) {
    return <RootLayout><div>데이터를 불러오는 데 실패했습니다.</div></RootLayout>;
  }

  return (
    <RootLayout>
      <ProductHero product={productResult.data} />
      <ProductTabs
        productDetail={productDetailResult.data}
        productReview={productReviewResult.data}
      />
      <ProductFooter productWish={productWishResult.data} productId={numericProductId} />
    </RootLayout>
  );
}