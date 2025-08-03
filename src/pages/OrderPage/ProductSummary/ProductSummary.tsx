import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductSummary } from '@/api/products';
import * as S from './ProductSummary.styles';

const ProductSummary = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id ?? '', 10);

  if (isNaN(productId)) {
    throw new Error('유효하지 않은 상품 ID입니다.');
  }

  const { data } = useSuspenseQuery({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProductSummary(productId),
  });

  const product = data?.data;

  if (!product) {
    throw new Error('상품 정보를 찾을 수 없습니다.');
  }

  return (
    <S.Wrapper>
      <S.Thumbnail src={product.imageURL} alt={product.name} />
      <S.Info>
        <S.Name>{product.name}</S.Name>
        {product.brandName && (
          <S.Brand>
            <span>{product.brandName}</span>
          </S.Brand>
        )}
        <S.Price>{product.price.toLocaleString()}원</S.Price>
      </S.Info>
    </S.Wrapper>
  );
};

export default ProductSummary;
