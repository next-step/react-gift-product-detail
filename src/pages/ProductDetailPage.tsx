import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/hooks/useProductInfo';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isPending, isError } = useProductInfo(productId);

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생</p>;

  if (!data) return <p>데이터 없음</p>;

  return (
    <div>
      <h2>상품 상세</h2>
      <img src={data.imageURL} alt={data.name} width={200} />
      <p>상품명: {data.name}</p>
      <p>가격: {data.price.sellingPrice.toLocaleString()}원</p>
      <p>브랜드: {data.brandInfo.name}</p>
    </div>
  );
};

export default ProductDetailPage;
