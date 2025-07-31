import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import type { ThemeProduct } from '@/api/themes';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadiusLarge};
  padding: ${({ theme }) => theme.spacing.card.paddingLarge};
  background: ${({ theme }) => theme.colors.gray.gray300};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadiusLarge};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.red.red700};
  color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  z-index: 1;
`;

const BrandName = styled.div`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray700};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceSection = styled.div`
  margin-top: auto;
`;

const SellingPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.typography.title2Bold.lineHeight};
`;

const BasicPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray600};
  text-decoration: line-through;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
`;

const DiscountRate = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  color: ${({ theme }) => theme.colors.red.red700};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const BrandLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

const BrandText = styled.span`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
`;

interface ProductCardProps {
  product: ThemeProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const discountRate = product.price?.discountRate || 0;
  const hasDiscount = typeof discountRate === 'number' && discountRate > 0;

  return (
    <Card onClick={handleClick}>
      <ImageContainer>
        {hasDiscount && (
          <DiscountBadge>{discountRate}%</DiscountBadge>
        )}
        <ProductImage src={product.imageURL} alt={product.name} />
      </ImageContainer>
      
      <Content>
        <BrandInfo>
          <BrandLogo src={product.brandInfo.imageURL} alt={product.brandInfo.name} />
          <BrandText>{product.brandInfo.name}</BrandText>
        </BrandInfo>
        
        <ProductName>{product.name}</ProductName>
        
        <PriceSection>
          {hasDiscount && (
            <BasicPrice>
              {product.price.basicPrice.toLocaleString()}원
            </BasicPrice>
          )}
          <SellingPrice>
            {product.price.sellingPrice.toLocaleString()}원
            {hasDiscount && <DiscountRate>{discountRate}%</DiscountRate>}
          </SellingPrice>
        </PriceSection>
      </Content>
    </Card>
  );
};

export default ProductCard;
