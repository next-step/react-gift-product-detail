import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 483px;
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
  return (
    <Wrapper>
      <ProductImg />

      <ProductText>
        <ProductTitle>부드러운 고구마 라떼 케이크</ProductTitle>
        <ProductPrice>26350원</ProductPrice>
      </ProductText>
      <Brand>
        <BrandImg />
        <BrandName>뚜레쥬르</BrandName>
      </Brand>
    </Wrapper>
  );
}
