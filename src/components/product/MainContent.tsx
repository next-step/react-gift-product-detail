import { useParams } from 'react-router-dom';
import { useGiftProductById } from '../../hooks/useGiftProductById';
import styled from '@emotion/styled';

const Container = styled.div`
  padding-bottom: 8px;
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const ProductName = styled.h3`
  ${({ theme }) => theme.typography.title1Bold};
  text-align: left;
  color: ${({ theme }) => theme.colors.gray900};
  padding-bottom: 8px;
  padding-top: 20px;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
  text-align: left;
  color: ${({ theme }) => theme.colors.gray900};
  padding-bottom: 8px;
`;

const BrandInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;

const BrandImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;
const BrandName = styled.div`
  ${({ theme }) => theme.typography.subtitle1Regular};
  color: ${({ theme }) => theme.colors.gray900};
  text-align: left;
`;

const MainContent = () => {
  const { productId } = useParams<{ productId: string }>();
  const id = Number(productId);

  const {
    data: product,
    isLoading,
    isError,
  } = useGiftProductById(id);

  if (isLoading)
    return (
      <div style={{ padding: 20 }}>
        상품 정보를 불러오는 중입니다...
      </div>
    );

  if (isError || !product)
    return (
      <div style={{ padding: 20 }}>
        상품 정보를 불러오지 못했습니다.
      </div>
    );

  return (
    <Container>
      <MainImg src={product?.imageURL}></MainImg>
      <ProductName>{product.name}</ProductName>
      <ProductPrice>{product.price.sellingPrice}원</ProductPrice>
      <BrandInfo>
        <BrandImg src={product.brandInfo.imageURL}></BrandImg>
        <BrandName>{product.brandInfo.name}</BrandName>
      </BrandInfo>
    </Container>
  );
};

export default MainContent;
