import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <h2>상품 상세 페이지</h2>
      <p>상품 ID: {productId}</p>
    </div>
  );
};

export default ProductDetailPage;
