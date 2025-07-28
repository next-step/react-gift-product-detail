import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import type { ProductInfo } from "@/types/product";
import { useParams } from "react-router-dom";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useProductDetailContent } from "@/hooks/useProductDetailContent";
import { useState } from "react";
import { useProductReview } from "@/hooks/useProductReview";
import { useProductWish } from "@/hooks/useProductWish";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useProductDetail<ProductInfo>(productId);

  const [selectedTab, setSelectedTab] = useState<"desc" | "review" | "info">(
    "desc",
  );
  const { data: reviews } = useProductReview(productId);
  const { data: wishData } = useProductWish(productId);
  const { data: detail } = useProductDetailContent(productId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !product) return <div>에러 발생</div>;
  if (!detail) return <div>상세 정보 에러 발생</div>;

  return (
    <Container>
      <Wrapper>
        <ProductWrapper>
          <ProudctImg src={product.imageURL} alt={product.name} />
          <Spacing height="20px" />
          <Product>
            <ProductName>{product.name}</ProductName>
            <Spacing height="8px" />
            <ProductPrice>
              {product.price.sellingPrice.toLocaleString()}원
            </ProductPrice>
          </Product>
          <Spacing height="16px" />
          <Spacing height="1px" />
          <Spacing height="16px" />
          <BrandBox>
            <BrandImg src={product.brandInfo.imageURL} />
            <BrandName>{product.brandInfo.name}</BrandName>
          </BrandBox>
          <Spacing height="16px" />
        </ProductWrapper>
        <Spacing height="8px" />
        <DetailWrapper>
          <Detail>
            <DetailCategory>
              <DetailButton
                onClick={() => setSelectedTab("desc")}
                isActive={selectedTab === "desc"}
              >
                <CategoryName isActive={selectedTab === "desc"}>
                  상품설명
                </CategoryName>
                {selectedTab === "desc" && <CategoryUnderbar />}
              </DetailButton>
              <DetailButton
                onClick={() => setSelectedTab("review")}
                isActive={selectedTab === "review"}
              >
                <CategoryName isActive={selectedTab === "review"}>
                  선물후기
                </CategoryName>
                {selectedTab === "review" && <CategoryUnderbar />}
              </DetailButton>
              <DetailButton
                onClick={() => setSelectedTab("info")}
                isActive={selectedTab === "info"}
              >
                <CategoryName isActive={selectedTab === "info"}>
                  상세정보
                </CategoryName>
                {selectedTab === "info" && <CategoryUnderbar />}
              </DetailButton>
            </DetailCategory>
            <DetailContainer>
              <DetailContent>
                <ContentWrapper>
                  {selectedTab === "desc" && (
                    <Content
                      dangerouslySetInnerHTML={{
                        __html: detail?.description ?? "",
                      }}
                    />
                  )}

                  {selectedTab === "review" && (
                    <Content>
                      {reviews?.reviews?.length ? (
                        reviews.reviews.map((review) => (
                          <div key={review.id}>
                            <Spacing height="16px" />
                            <CategoryId>{review.authorName}</CategoryId>
                            <Spacing height="8px" />
                            <CategoryContent>{review.content}</CategoryContent>
                            <Spacing height="8px" />
                          </div>
                        ))
                      ) : (
                        <p>후기가 없습니다.</p>
                      )}
                    </Content>
                  )}

                  {selectedTab === "info" && (
                    <Content>
                      {detail.announcements.map((item) => (
                        <div key={item.displayOrder}>
                          <Spacing height="16px" />
                          <CategoryId>{item.name}</CategoryId>
                          <Spacing height="8px" />
                          <CategoryContent>{item.value}</CategoryContent>
                          <Spacing height="8px" />
                        </div>
                      ))}
                    </Content>
                  )}

                  <Spacing height="64px" />
                </ContentWrapper>
              </DetailContent>
            </DetailContainer>
          </Detail>
        </DetailWrapper>
        <OrderWrapper>
          <LikeButton>
            <LikeNum>❤️ {wishData?.wishCount ?? 0}</LikeNum>
          </LikeButton>
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

const ProductWrapper = styled.section`
  width: 100%;
`;

const ProudctImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const Product = styled.div`
  width: 100%;
  padding: 0px 1rem;
`;

const ProductName = styled.h3`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;

const BrandBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0px 1rem;
`;

const BrandImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

const BrandName = styled.p`
  ${({ theme }) => theme.typography.subtitle1Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;

const DetailWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray.white};
`;

const Detail = styled.div`
  width: 100%;
`;

const DetailCategory = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const DetailButton = styled.button<{ isActive: boolean }>`
  position: relative;
  padding: 16px 20px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 1;
  transition: 0.2s;
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  ${({ isActive, theme }) =>
    !isActive &&
    `
    &:hover {
      background-color: ${theme.colors.gray[100]};
    }
  `}
`;

const CategoryName = styled.p<{ isActive: boolean }>`
  ${({ theme }) => theme.typography.subtitle1Regular};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray[900] : theme.colors.gray[600]};
  margin: 0px;
  text-align: left;
`;

const CategoryUnderbar = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0px;
  right: 0px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`;

const DetailContainer = styled.div`
  min-height: 400px;
`;

const DetailContent = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Content = styled.div`
  white-space: pre-wrap;
  max-width: 100%;
  width: 100%;
  overflow-y: hidden;
  ${({ theme }) => theme.typography.body1Regular};
  img {
    width: 100%;
    display: block;
    height: auto;
  }
`;

const CategoryId = styled.p`
  ${({ theme }) => theme.typography.body2Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;

const CategoryContent = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
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

const LikeButton = styled.button`
  width: 4rem;
  height: 3.125rem;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  border: none;
`;

const LikeNum = styled.p`
  font-size: 0.625rem;
  font-weight: 400;
  line-height: 1rem;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0pxs;
  text-align: left;
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
