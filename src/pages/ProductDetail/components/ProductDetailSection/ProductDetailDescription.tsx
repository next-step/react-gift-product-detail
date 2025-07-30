import type { ProductDetail } from '@/apis/domain/products/type';
import styled from '@emotion/styled';
import DOMPurify from 'dompurify';

type Props = {
  description: ProductDetail['description'];
};

export const ProductDetailDescription = ({ description }: Props) => {
  const safeDescription = DOMPurify.sanitize(description);

  return (
    <Wrapper>
      <Description dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Description = styled.div`
  white-space: pre-wrap;
  max-width: 100%;
  width: 100%;
  overflow-y: hidden;
  ${({ theme }) => theme.typography.body1Regular};

  * {
    width: 100%;
  }
`;
