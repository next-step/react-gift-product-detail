import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '@/hooks/useProductDetail';

const ProductDescription = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: detail } = useProductDetail(productId!);

  return (
    <Description dangerouslySetInnerHTML={{ __html: detail.description }} />
  );
};

export default ProductDescription;

const Description = styled.div`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;
