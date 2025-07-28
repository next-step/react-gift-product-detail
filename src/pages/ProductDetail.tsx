import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Text from '@/common/Text';
import LoadingSpinner from '@/common/LoadingSpinner';
import useProductDetail from '@/hooks/useProductDetail';
import NavigationBar from '@/common/NavigationBar';
import ProductOverview from '@/components/productDetail/ProductOverview';
import BaseButton from '@/common/BaseButton';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetail(Number(productId));

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Text>{error?.message}</Text>;
  if (!product) return <Text>상품 정보를 찾을 수 없습니다.</Text>;

  const handleOrderClick = () => {
    navigate(`/order/${product.id}`);
  };

  return (
    <Layout>
      <Content>
        <NavigationBar />
        <ProductOverview product={product} />
        <BaseButton onClick={handleOrderClick} backgroundColor="#FEE500">
          <Text size="title2" weight="bold">
            주문하기
          </Text>
        </BaseButton>
      </Content>
    </Layout>
  );
};

export default ProductDetail;

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  width: 100%;
  max-width: 720px;
`;
