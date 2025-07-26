import Divider from "@/components/common/Divider";
import styled from "@emotion/styled";

interface ProductInfoProps {
  productId: string;
}

const ProductInfo = ({}: ProductInfoProps) => {
  return (
    <Container>
      <ProductImg src="https://st.kakaocdn.net/product/gift/product/20250218142602_030fce0196af42189694554c03a54fbb.jpg" />
      <InfoWrapper>
        <ProductName>부드러운 고구마 라떼 케이크</ProductName>
        <ProductPrice>
          26359<Span>원</Span>
        </ProductPrice>
      </InfoWrapper>
      <Divider spacing="2px" fill={false} />
      <BrandWrapper>
        <BrandImg src="https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg" />
        <BrandName>뚜레쥬르</BrandName>
      </BrandWrapper>
    </Container>
  );
};

export default ProductInfo;

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
`;
const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;
const InfoWrapper = styled.div`
  width: 100%;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing2};
`;
const ProductName = styled.h3`
  font: ${({ theme }) => theme.typography.title1Bold};
  text-align: left;
`;
const ProductPrice = styled.p`
  font: ${({ theme }) => theme.typography.title1Bold};
  text-align: left;
`;
const Span = styled.span`
  font-weight: 400;
`;
const BrandWrapper = styled(InfoWrapper)`
  flex-direction: row;
`;
const BrandImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;
const BrandName = styled.p`
  font: ${({ theme }) => theme.typography.subtitle1Regular};
  display: flex;
  align-items: center;
`;
