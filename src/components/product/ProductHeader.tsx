import styled from '@emotion/styled';
import type { Product } from '@/types/product';

interface ProductHeaderProps {
  product: Product;
}

const Container = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
  margin: ${({ theme }) => theme.spacing.spacing3} 0 ${({ theme }) => theme.spacing.spacing1};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const Price = styled.div`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const BrandName = styled.span`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray200};
  margin: ${({ theme }) => theme.spacing.spacing4} 0;
`;

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <Container>
      <Thumbnail src={product.imageURL} alt={product.name} />
      <Title>{product.name}</Title>
      <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
      <Divider />
      <BrandWrapper>
        <BrandLogo src={product.brandInfo.imageURL} alt={product.brandInfo.name} />
        <BrandName>{product.brandInfo.name}</BrandName>
      </BrandWrapper>
    </Container>
  );
};

export default ProductHeader;
