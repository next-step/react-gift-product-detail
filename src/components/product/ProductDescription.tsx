import styled from '@emotion/styled';
import { useProductDetail } from '@/hooks/useProduct';
import parse from 'html-react-parser';

interface ProductDescriptionProps {
  productId: number;
}

const Description = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  color: ${({ theme }) => theme.colors.semantic.textDefault};

  p {
    ${({ theme }) => theme.typography.title2Regular};
    margin-bottom: ${({ theme }) => theme.spacing.spacing3};
  }

  img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.spacing.spacing2};
    margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  }
`;

const ProductDescription = ({ productId }: ProductDescriptionProps) => {
  const { data } = useProductDetail(productId);

  if (!data?.description) {
    return null;
  }

  return <Description>{parse(data.description)}</Description>;
};

export default ProductDescription;
