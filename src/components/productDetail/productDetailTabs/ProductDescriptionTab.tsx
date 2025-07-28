import styled from '@emotion/styled';
import type { ProductDescription } from '@/types/product';

interface ProductDescriptionTabProps {
  description: ProductDescription | undefined;
}

const ProductDescriptionTab = ({ description }: ProductDescriptionTabProps) => {
  return (
    <Layout>
      {description ? (
        <HTMLContainer
          dangerouslySetInnerHTML={{ __html: description.description }}
        />
      ) : (
        <FallbackText>상품 설명이 없습니다.</FallbackText>
      )}
    </Layout>
  );
};

export default ProductDescriptionTab;

const Layout = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing1};
`;

const HTMLContainer = styled.div`
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  p {
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.gray800};
  }

  strong {
    font-weight: bold;
  }
`;

const FallbackText = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
`;
