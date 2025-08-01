/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import type { Product } from "@/types/api_types";

interface ProductInfoSectionProps {
  product: Product;
}

const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  return (
    <Container>
      <ProductImage src={product.imageURL} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>
        {product.price.sellingPrice.toLocaleString()}원
      </ProductPrice>
      <BrandContainer>
        <BrandImage
          src={product.brandInfo.imageURL}
          alt={product.brandInfo.name}
        />
        <BrandName>{product.brandInfo.name}</BrandName>
      </BrandContainer>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 8px;
  text-align: left;
  max-width: 700px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductName = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  font-weight: bold;
`;

const ProductPrice = styled.div`
  margin-top: -10px;
  padding: 10px;
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  font-weight: bold;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  margin-top: 5px;
  padding: 10px;
`;

const BrandImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border-radius: 50%;
  object-fit: cover;
`;

const BrandName = styled.div`
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
`;

export default ProductInfoSection;
