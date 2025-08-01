import type { Product } from '@/types/product';
import styled from '@emotion/styled';

interface ProductHeroProps {
  product: Product;
}

export const ProductHero = ({ product }: ProductHeroProps) => {
  return (
    <Container>
      <ProductImage src={product.imageURL} alt={product.name} />
      <BrandName>{product.brandName}</BrandName>
      <ProductName>{product.name}</ProductName>
      <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
`;

const BrandName = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #888;
`;

const ProductName = styled.h1`
  margin-top: 8px;
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
`;