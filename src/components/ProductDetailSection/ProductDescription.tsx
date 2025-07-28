import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '@/hooks/useProductDetail';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';

const ProductDescription = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: detail, isLoading, isError } = useProductDetail(productId);

  if (isLoading) return loading;
  if (isError || !detail) {
    return <ErrorText>{ERROR_MESSAGES.LOAD_PRODUCT_FAIL}</ErrorText>;
  }

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

const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.semantic.text.default};
  padding: ${({ theme }) => theme.spacing[6]};
  ${({ theme }) => theme.typography.body.body2Regular};
`;
