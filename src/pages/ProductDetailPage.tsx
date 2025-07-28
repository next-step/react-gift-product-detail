import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/productDetail/ProductCard";
import DetailCard from "@/components/productDetail/DetailCard";
import WishButton from "@/components/productDetail/WishButton";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  return (
    <Container>
      <Wrapper>
        <ProductCard productId={productId ?? ""} />
        <Spacing height="8px" />
        <DetailCard productId={productId ?? ""} />
        <OrderWrapper>
          <WishButton productId={productId ?? ""} />
          <OrderButton>
            <Order>주문하기</Order>
          </OrderButton>
        </OrderWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 720px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray.white};
`;

const Wrapper = styled.div`
  width: 100%;
`;

const OrderWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray.white};
`;

const OrderButton = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.kakao.yellow.default};
  border: none;
`;

const Order = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;
