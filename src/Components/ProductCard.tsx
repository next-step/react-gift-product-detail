import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

// 범용 상품 타입 정의
export interface ProductData {
  id: number;
  name: string;
  imageURL: string;
  brandInfo?: {
    id?: number;
    name: string;
    imageURL?: string;
  };
  price?: {
    basicPrice?: number;
    sellingPrice: number;
    discountRate?: number;
  };
  rankingType?: string;
}

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

const RankBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.red.red700};
  color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  padding: 2px 10px;
  z-index: 2;
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
  product: ProductData;
  onClick?: (productId: number) => void;
  showRankBadge?: boolean;
  rankNumber?: number;
}

const ProductCard = ({ 
  product, 
  onClick, 
  showRankBadge = false, 
  rankNumber 
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(product.id);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  // 할인율이 0보다 큰 경우에만 할인 정보 표시
  const discountRate = product.price?.discountRate;
  const hasDiscount = typeof discountRate === 'number' && discountRate > 0;
  const hasBasicPrice = product.price?.basicPrice && product.price.basicPrice > product.price.sellingPrice;
  const shouldShowDiscount = hasDiscount && hasBasicPrice;

  return (
    <Card onClick={handleClick}>
      <ImageContainer>
        {showRankBadge && rankNumber && (
          <RankBadge>{rankNumber}</RankBadge>
        )}
        <ProductImage src={product.imageURL} alt={product.name} />
      </ImageContainer>
      
      <Content>
        {product.brandInfo?.name && (
          <BrandInfo>
            {product.brandInfo.imageURL && (
              <BrandLogo src={product.brandInfo.imageURL} alt={product.brandInfo.name} />
            )}
            <BrandText>{product.brandInfo.name}</BrandText>
          </BrandInfo>
        )}
        
        <ProductName>{product.name}</ProductName>
        
        <PriceSection>
          <SellingPrice>
            {product.price?.sellingPrice && product.price.sellingPrice > 0
              ? `${product.price.sellingPrice.toLocaleString()}원`
              : "가격 정보 없음"
            }
          </SellingPrice>
          {shouldShowDiscount && (
            <>
              <BasicPrice>
                {product.price?.basicPrice?.toLocaleString()}원
              </BasicPrice>
              <DiscountRate>
                {discountRate}%
              </DiscountRate>
            </>
          )}
        </PriceSection>
      </Content>
    </Card>
  );
};

export default ProductCard;
