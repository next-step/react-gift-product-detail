import { ErrorMessage } from "@/components/common/Input/FormErrorMessage";
import { Loading } from "@/components/Loading/Loading";
import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetail } from "@/data/api";
import Layout from "@/layout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorContainer } from "../HomePage/components/Category/Category.styles";
import LikeIconImage from "./assets/heart.png";
import {
  LikeCount,
  LikeIcon,
  LikeIconContainer,
  OrderButton,
  OrderButtonContainer,
} from "./ProductDetailPage.styles";
import { ROUTES } from "@/constants/routes";
import styled from "@emotion/styled";

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
`;

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[5]};
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ProductName = styled.h1`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const ProductPrice = styled.p`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const ProductPriceUnit = styled.span`
  font-size: ${({ theme }) => theme.typography.title.title1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.title.title1Regular.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const BrandInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing[5]};
  gap: ${({ theme }) => theme.spacing[3]};
`;

const BrandImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: contain;
`;

const BrandName = styled.p``;

function BottomNavigation({ productId }: { productId: string }) {
  const navigate = useNavigate();

  const handleOrderButtonClick = () => {
    navigate(ROUTES.ORDER.replace(":id", productId));
  };

  return (
    <OrderButtonContainer>
      <LikeIconContainer>
        <LikeIcon src={LikeIconImage} alt="Like Icon" />
        <LikeCount>1237</LikeCount>
      </LikeIconContainer>
      <OrderButton onClick={handleOrderButtonClick}>주문하기</OrderButton>
    </OrderButtonContainer>
  );
}

function ProductDetailPage() {
  const { id } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_DETAIL(id),
    queryFn: () => getProductDetail(id!),
  });

  return (
    <Layout>
      <ErrorBoundary
        fallback={
          <ErrorContainer>
            <ErrorMessage>등록된 상품이 없습니다.</ErrorMessage>
          </ErrorContainer>
        }
      >
        <Suspense fallback={<Loading />}>
          <ProductDetailContainer>
            <ProductImage src={data.imageURL} alt={data.name} />
            <ProductInfoContainer>
              <ProductName>{data.name}</ProductName>
              <ProductPrice>
                {data.price.sellingPrice}
                <ProductPriceUnit>원</ProductPriceUnit>
              </ProductPrice>
            </ProductInfoContainer>
            <Divider />
            <BrandInfoContainer>
              <BrandImage
                src={data.brandInfo.imageURL}
                alt={data.brandInfo.name}
              />
              <BrandName>{data.brandInfo.name}</BrandName>
            </BrandInfoContainer>
          </ProductDetailContainer>
        </Suspense>
      </ErrorBoundary>
      <BottomNavigation productId={id!} />
    </Layout>
  );
}

export default ProductDetailPage;
