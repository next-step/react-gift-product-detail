import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/hooks/useProductInfo';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';

const ProductHeader = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, isError } = useProductInfo(productId);

  if (isLoading) return loading;
  if (isError || !product) {
    return <ErrorText>{ERROR_MESSAGES.LOAD_PRODUCT_FAIL}</ErrorText>;
  }

  return (
    <>
      <Image src={product.imageURL} alt={product.name} />
      <Content>
        <Title>{product.name}</Title>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        <Brand>
          <BrandLogo
            src={product.brandInfo.imageURL}
            alt={product.brandInfo.name}
          />
          <BrandName>{product.brandInfo.name}</BrandName>
        </Brand>
      </Content>
    </>
  );
};

export default ProductHeader;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  margin: 0 ${({ theme }) => theme.spacing[2]};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.title.title1Bold};
`;

const Price = styled.p`
  ${({ theme }) => theme.typography.title.title2Bold};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} 0`};
  border-top: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[100]};
`;

const BrandLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const BrandName = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
`;

const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.semantic.text.default};
  padding: ${({ theme }) => theme.spacing[6]};
  ${({ theme }) => theme.typography.body.body2Regular};
`;
