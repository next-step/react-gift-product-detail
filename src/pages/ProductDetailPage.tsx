import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout';
import { ROUTE_HOME } from '@/constants';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  if (!productId) {
    navigate(ROUTE_HOME);
    return null;
  }

  return (
    <Container>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>상품 상세 페이지</h1>
        <p>상품 ID: {productId}</p>
        <p>구현 예정...</p>
      </div>
    </Container>
  );
};

export default ProductDetailPage;
