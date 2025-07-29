import { Suspense } from 'react';
import { useParams } from 'react-router';
import ProductHeroSection from '@/sections/ProductDetailSection/ProductHeroSection';
import ProductTabSection from '@/sections/ProductDetailSection/ProductTabSection';
import ProductBottomBar from '@/sections/ProductDetailSection/ProductBottomBar';
import PageContainer from '@/components/PageContainer';
import Spinner from '@/components/Spinner';
import { withAuth } from '@/hoc/withAuth';

function ProductDetail({ productId }: { productId: number }) {
  return (
    <PageContainer>
      <Suspense fallback={<Spinner />}>
        <ProductHeroSection productId={productId} />
        <ProductTabSection productId={productId} />
        <ProductBottomBar productId={productId} />
      </Suspense>
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
