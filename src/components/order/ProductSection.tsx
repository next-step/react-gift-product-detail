import styled from '@emotion/styled';
import type { ProductSummary } from '@/types/product';

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const ProductInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing3};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing4};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray300};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundFill};

  img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.spacing.spacing1};
  }

  div {
    flex: 1;
    color: ${({ theme }) => theme.colors.semantic.textDefault};
  }
`;

type Props = {
  product: ProductSummary;
};

const ProductSection = ({ product }: Props) => {
  return (
    <Section>
      <Label>상품 정보</Label>
      <ProductInfo>
        <img src={product.imageURL} alt={product.name} />
        <div>
          <div>{product.name}</div>
          <div>{product.brandName}</div>
          <div>
            <strong>{product.price.toLocaleString()}원</strong>
          </div>
        </div>
      </ProductInfo>
    </Section>
  );
};

export default ProductSection;
