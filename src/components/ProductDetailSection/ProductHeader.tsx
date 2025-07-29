import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/hooks/useProductInfo';

const ProductHeader = () => {
  const { productId } = useParams();
  const { data: product } = useProductInfo(productId!);

  return (
    <Wrapper>
      <Image src={product.imageURL} alt={product.name} />
      <Content>
        <Title>{product.name}</Title>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        <Brand>
          <BrandLogo
            src={product.brandInfo.imageURL}
            alt={product.brandInfo.name}
          />
          <span>{product.brandInfo.name}</span>
        </Brand>
      </Content>
    </Wrapper>
  );
};

export default ProductHeader;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: ${({ theme }) => theme.spacing[2]};
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
  border-top: 1px solid ${({ theme }) => theme.color.gray[100]};
  gap: ${({ theme }) => theme.spacing[2]};
`;

const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;
