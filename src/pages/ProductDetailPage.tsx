import { Suspense } from 'react';
import { useParams } from 'react-router';
import ProductHeroSection from '@/sections/ProductDetailSection/ProductHeroSection';
import ProductTabSection from '@/sections/ProductDetailSection/ProductTabSection';
import ProductBottomBar from '@/sections/ProductDetailSection/ProductBottomBar';
import PageContainer from '@/components/PageContainer';
import Spinner from '@/components/Spinner';
import { withAuth } from '@/hoc/withAuth';
import CustomErrorBoundary from '@/components/CustomErrorBoundary';

function ProductDetail({ productId }: { productId: number }) {
  return (
    <PageContainer>
      <CustomErrorBoundary fallback={<p>상품 정보를 불러오는데 실패했습니다.</p>}>
        <Suspense fallback={<Spinner />}>
          <ProductHeroSection productId={productId} />
        </Suspense>
      </CustomErrorBoundary>

      <CustomErrorBoundary fallback={<p>상품 상세 정보를 불러오는데 실패했습니다.</p>}>
        <Suspense fallback={<Spinner />}>
          <ProductTabSection productId={productId} />
        </Suspense>
      </CustomErrorBoundary>

      <CustomErrorBoundary fallback={<p>하단 주문 바를 불러오는데 실패했습니다.</p>}>
        <Suspense fallback={<Spinner />}>
          <ProductBottomBar productId={productId} />
        </Suspense>
      </CustomErrorBoundary>
    </PageContainer>
  );
}

const ProtectedProductDetail = withAuth(ProductDetail);

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const numericId = Number(productId);

  if (isNaN(numericId)) return null;

  return <ProtectedProductDetail productId={numericId} />;
}
