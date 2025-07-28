import styled from '@emotion/styled';
import type { ProductResponse } from '@/api/types';

interface ProductDetailHeaderProps {
  product: ProductResponse | null;
  isLoading: boolean;
}

const HeaderContainer = styled.div`
  width: 100%;
  background: #fff;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  background: #f7f8f9;
`;

const ProductInfo = styled.div`
  padding: 20px 16px;
  background: #fff;
`;

const ProductName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #2a3038;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #2a3038;
  margin: 0 0 8px 0;
`;

const ProductBrand = styled.div`
  font-size: 14px;
  color: #868b94;
  margin: 0;
`;

const LoadingSkeleton = styled.div`
  width: 100%;
  height: 300px;
  background: #f7f8f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #868b94;
`;

const ProductDetailHeader = ({
  product,
  isLoading,
}: ProductDetailHeaderProps) => {
  if (isLoading) {
    return (
      <HeaderContainer>
        <LoadingSkeleton>상품 정보를 불러오는 중...</LoadingSkeleton>
      </HeaderContainer>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <HeaderContainer>
      <ProductImage
        src={product.data.imageURL}
        alt={product.data.name}
        loading="lazy"
      />
      <ProductInfo>
        <ProductName>{product.data.name}</ProductName>
        <ProductPrice>
          {product.data.price.sellingPrice.toLocaleString()}원
        </ProductPrice>
        <ProductBrand>{product.data.brandInfo.name}</ProductBrand>
      </ProductInfo>
    </HeaderContainer>
  );
};

export default ProductDetailHeader;
