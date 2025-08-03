import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import BottomButton from '@/components/BottomButton';
import SectionDivider from '@/components/SectionDivider';
import { fetchProductInfo } from '@/api/products';
import { useState } from 'react';
import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import ProductOverview from './ProductOverview';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/paths';
import WishButtonContainer from './WishButton/WishButtonContainer';
import ProductContent from './ProductContent/ProductContent';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const id = Number(productId);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const { data: productRes, isLoading: isProductLoading } = useReactQueryFetch(
    ['product', id],
    () => fetchProductInfo(id)
  );

  if (isProductLoading || !productRes) return <div>Loading...</div>;

  const goToOrderPage = () => {
    navigate(PATH.ORDER_DETAIL(id));
  };

  return (
    <Layout>
      <NavigationBar />
      <ProductOverview product={productRes} />
      <SectionDivider />

      <ErrorBoundary fallback={<div>상품 정보를 불러오지 못했습니다.</div>}>
        <Suspense fallback={<div>상품 상세 로딩 중...</div>}>
          <ProductContent id={id} activeTab={activeTab} setActiveTab={setActiveTab} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>찜 정보를 불러올 수 없습니다.</div>}>
        <Suspense fallback={<div>찜 정보 로딩 중...</div>}>
          <WishButtonContainer productId={id} />
        </Suspense>
      </ErrorBoundary>

      <BottomButton onClick={goToOrderPage}>주문하기</BottomButton>
    </Layout>
  );
};

export default ProductDetailPage;
