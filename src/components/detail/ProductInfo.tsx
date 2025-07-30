import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/hooks/useProductInfo';

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: auto;
`;

const ProductText = styled.section`
  background: #fff;
  padding: 20px 16px 16px;
`;

const ProductTitle = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
`;

const Brand = styled.p`
  padding: 16px;
  display: flex;
  align-items: center;
  background: #fff;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const BrandImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #000;
  margin-right: 8px;
`;

const BrandName = styled.span`
  ${({ theme }) => theme.typography.subtitle1Regular};
`;

export default function ProductInfo() {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isError } = useProductInfo(Number(productId));

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !data) return <div>상품 정보를 불러올 수 없습니다.</div>;

  return (
    <Wrapper>
      <ProductImg src={data.imageURL} alt={data.name} />

      <ProductText>
        <ProductTitle>{data.name}</ProductTitle>
        <ProductPrice>{data.price.sellingPrice}원</ProductPrice>
      </ProductText>
      <Brand>
        <BrandImg src={data.brandInfo.imageURL} alt={data.brandInfo.name} />
        <BrandName>{data.brandInfo.name}</BrandName>
      </Brand>
    </Wrapper>
  );
}
