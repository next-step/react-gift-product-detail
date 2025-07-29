import styled from '@emotion/styled';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  @media (min-width: 480px) {
    border-radius: 16px;
    padding: 16px;
  }
  
  @media (min-width: 768px) {
    padding: 18px 16px 16px 16px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08);
    }
  }
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  object-fit: cover;
  background: #eee;
  margin-bottom: 12px;
  
  @media (min-width: 480px) {
    border-radius: 12px;
    margin-bottom: 14px;
  }
`;

const RankBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #e74c3c;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 8px;
  padding: 2px 10px;
  z-index: 2;
`;

const BrandName = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 6px;
  font-weight: 500;
  
  @media (min-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
`;

const ProductName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (min-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;

const SellingPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  
  @media (min-width: 480px) {
    font-size: 1.2rem;
  }
`;

const BasicPrice = styled.div`
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
  
  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

const DiscountRate = styled.div`
  font-size: 0.8rem;
  color: #e74c3c;
  font-weight: 600;
  
  @media (min-width: 480px) {
    font-size: 0.9rem;
  }
`;

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
  const handleClick = () => {
    onClick?.(product.id);
  };

  // 할인율이 0보다 큰 경우에만 할인 정보 표시
  const discountRate = product.price?.discountRate;
  const hasDiscount = typeof discountRate === 'number' && discountRate > 0;
  const hasBasicPrice = product.price?.basicPrice && product.price.basicPrice > product.price.sellingPrice;
  const shouldShowDiscount = hasDiscount && hasBasicPrice;

  return (
    <Card onClick={handleClick}>
      {showRankBadge && rankNumber && (
        <RankBadge>{rankNumber}</RankBadge>
      )}
      <ProductImage src={product.imageURL} alt={product.name} />
      {product.brandInfo?.name && (
        <BrandName>{product.brandInfo.name}</BrandName>
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
    </Card>
  );
};

export default ProductCard;
