/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from "react-router-dom";
import { useProductSummary } from "@/hooks/queries/useProductSummary";
import { PATH } from "@/constants/path";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";

import styled from "@emotion/styled";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const id = Number(productId);

  const { data: product } = useProductSummary(id);

  if (!product) return null;

  return (
    <PageLayout>
      <PageContainer>
        <Navigation />
        <Wrapper>
          <Image src={product.imageURL} alt={product.name} />
          <Info>
            <Brand>{product.brandInfo.name}</Brand>
            <Name>{product.name}</Name>
            <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
          </Info>

          <StickyFooter>
            <OrderButton onClick={() => navigate(PATH.ORDER(product.id))}>
              주문하기
            </OrderButton>
          </StickyFooter>
        </Wrapper>
      </PageContainer>
    </PageLayout>
  );
};

export default ProductDetail;
const Wrapper = styled.div`
  padding-bottom: 90px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Info = styled.div`
  padding: 20px;
`;

const Brand = styled.div`
  font-size: 14px;
  color: #666;
`;

const Name = styled.h2`
  font-size: 18px;
  margin: 4px 0;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const StickyFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  padding: 12px 16px;
`;

const OrderButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  padding: 14px;
  color: ${({ theme }) => theme.colors.textDefault};
  font-size: 16px;
  font-weight: bold;
  border: none;
`;
