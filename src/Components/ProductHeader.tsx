import styled from '@emotion/styled';
import type { ProductInfo } from '@/types/productDetail';

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadiusLarge};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BrandName = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.3;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SellingPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const BasicPrice = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  text-decoration: line-through;
`;

const DiscountRate = styled.span`
  background: ${({ theme }) => theme.colors.red.red500};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.spacing.sm};
  font-size: 1rem;
  font-weight: 600;
`;

interface ProductHeaderProps {
  product: ProductInfo;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const discountRate = product.price?.discountRate || 0;
  const hasDiscount = typeof discountRate === 'number' && discountRate > 0;

  return (
    <>
      <ProductImage src={product.imageURL} alt={product.name} />
      
      <BrandName>{product.brandInfo.name}</BrandName>
      <ProductName>{product.name}</ProductName>
      
      <PriceSection>
        <SellingPrice>
          {product.price?.sellingPrice?.toLocaleString()}원
        </SellingPrice>
        {hasDiscount && (
          <>
            <BasicPrice>
              {product.price?.basicPrice?.toLocaleString()}원
            </BasicPrice>
            <DiscountRate>{discountRate}%</DiscountRate>
          </>
        )}
      </PriceSection>
    </>
  );
};

export default ProductHeader; 