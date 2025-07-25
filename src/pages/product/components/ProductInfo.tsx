import styled from "@emotion/styled";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

const ProductSummary = ({ product }: Props) => {
  return (
    <Wrapper>
      <Thumbnail src={product.imageURL} alt={product.name} />
      <Content>
        <Name>{product.name}</Name>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        <BrandBox>
          <BrandLogo
            src={product.brandInfo.imageURL}
            alt={product.brandInfo.name}
          />
          <BrandName>{product.brandInfo.name}</BrandName>
        </BrandBox>
      </Content>
    </Wrapper>
  );
};

export default ProductSummary;

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const Thumbnail = styled.img`
  width: 100%;
  max-width: 720px;
  display: block;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing5};
`;

const Name = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;

const Price = styled.p`
  margin-top: ${({ theme }) => theme.spacing.spacing1};
  ${({ theme }) => theme.typography.title1Regular};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;

const BrandBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.spacing4};
`;

const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.spacing2};
`;

const BrandName = styled.span`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;
