import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from '@/Components/layout/Layout';
import { useProductInfo } from '@/api/productDetail';

const ProductContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.layout.containerPadding};
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.gray.gray300};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BrandName = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const ProductName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.4;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SellingPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const BasicPrice = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  text-decoration: line-through;
`;

const DiscountRate = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.red.red700};
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray800};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Category = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.gray.gray100};
  color: ${({ theme }) => theme.colors.gray.gray700};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.red.red700};
`;

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const id = productId ? parseInt(productId) : 0;

  const { 
    data: product, 
    isLoading, 
    error 
  } = useProductInfo(id);

  if (isLoading) {
    return (
      <Layout>
        <LoadingMessage>상품 정보를 불러오는 중...</LoadingMessage>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage>
          상품 정보를 불러오는데 실패했습니다.
        </ErrorMessage>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <ErrorMessage>상품을 찾을 수 없습니다.</ErrorMessage>
      </Layout>
    );
  }

  const hasDiscount = product.price.discountRate > 0;
  const hasBasicPrice = product.price.basicPrice > product.price.sellingPrice;

  return (
    <Layout>
      <ProductContainer>
        <ProductImage src={product.imageURL} alt={product.name} />
        
        <BrandName>{product.brandInfo.name}</BrandName>
        <ProductName>{product.name}</ProductName>
        
        <PriceSection>
          <SellingPrice>
            {product.price.sellingPrice.toLocaleString()}원
          </SellingPrice>
          {hasDiscount && hasBasicPrice && (
            <>
              <BasicPrice>
                {product.price.basicPrice.toLocaleString()}원
              </BasicPrice>
              <DiscountRate>
                {product.price.discountRate}%
              </DiscountRate>
            </>
          )}
        </PriceSection>

        <Description>{product.description}</Description>
        
        <Category>카테고리: {product.category}</Category>
        
        {product.tags.length > 0 && (
          <Tags>
            {product.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
        )}
      </ProductContainer>
    </Layout>
  );
};

export default ProductDetail; 