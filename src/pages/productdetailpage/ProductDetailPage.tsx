import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import BaseButton from "@/components/common/BaseButton";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const navigateToOrder = () => {
    navigate(`/order/${productId}`);
  };

  return (
    <Container>
      <Title>상품 상세 페이지</Title>
      <ProductIdText>상품 ID: {productId}</ProductIdText>
      <OrderButton
        onClick={navigateToOrder}
        color="yellow"
        label="주문하기"
        size="large"
      />
      {/* 여기에 상품 정보를 불러오고 렌더링하는 로직을 추가합니다. */}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ProductIdText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const OrderButton = styled(BaseButton)`
  margin-top: 20px;
`;

export default ProductDetailPage;
