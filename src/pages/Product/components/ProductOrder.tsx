import styled from "@emotion/styled";
import Heart from "@/components/icons/Heart";
import { generatePath, Link } from "react-router-dom";
import { ROUTE_PATH } from "@/components/routes/routePath";

interface ProductOrderProps {
  productId: string;
}

const ProductOrder = ({ productId }: ProductOrderProps) => {
  return (
    <Container>
      <WishBtn>
        <Heart fill={false} />
        <WishCount>10</WishCount>
      </WishBtn>
      <OrderBtn to={generatePath(ROUTE_PATH.ORDER, { productId })}>주문하기</OrderBtn>
    </Container>
  );
};

export default ProductOrder;

const Container = styled.div`
  width: 100%;
  max-width: 720px;
  height: 50px;
  margin: 0 auto;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WishBtn = styled.button`
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
  border: none;
  width: 4rem;
  height: 3.125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const WishCount = styled.p`
  font: ${({ theme }) => theme.typography.label2Regular};
  font-size: 0.625rem;
`;
const OrderBtn = styled(Link)`
  background-color: ${({ theme }) => theme.color.kakaoYellow};
  color: ${({ theme }) => theme.color.gray1000};
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.typography.body1Bold};
  cursor: pointer;
`;
