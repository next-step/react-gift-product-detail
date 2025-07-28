/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import { useProductSummary } from "@/hooks/queries/useProductSummary";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";
import { DetailTab } from "@/components/product/DetailTab";
import { useRequireNavigate } from "@/hooks/useRequireNavigate";
import { useProductWish } from "@/hooks/queries/useProductWish";
import { useToggleWish } from "@/hooks/mutations/useToggleWish";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import styled from "@emotion/styled";

const ProductDetail = () => {
  const { productId } = useParams();
  const id = Number(productId);
  const { data: product } = useProductSummary(id);
  const goTo = useRequireNavigate();
  const { data: wishData } = useProductWish(product?.id);

  const toggleWish = useToggleWish();

  const handleWishClick = () => {
    if (!product || wishData === undefined) return;
    toggleWish.mutate({
      productId: product.id,
      isWished: wishData.isWished,
    });
  };
  if (!product) return null;

  return (
    <PageLayout>
      <PageContainer>
        <Navigation />
        <AsyncBoundary fallback={<div>상품 정보를 불러오는 중입니다...</div>}>
          <Wrapper>
            <Image src={product.imageURL} alt={product.name} />
            <Info>
              <Brand>{product.brandInfo.name}</Brand>
              <Name>{product.name}</Name>
              <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
            </Info>

            <AsyncBoundary
              fallback={<div>상세 정보를 불러오는 중입니다...</div>}
              errorFallback={<div>상세 정보 로딩에 실패했어요.</div>}
            >
              <DetailTab productId={product.id} />
            </AsyncBoundary>

            <StickyFooter>
              <PageContainer>
                <FooterInner>
                  <WishBox onClick={handleWishClick}>
                    <HeartIcon filled={wishData?.isWished ?? false} />
                    <span className="count">{wishData?.wishCount ?? 0}</span>
                  </WishBox>
                  <OrderButton onClick={() => goTo(`/order/${product.id}`)}>
                    주문하기
                  </OrderButton>
                </FooterInner>
              </PageContainer>
            </StickyFooter>
          </Wrapper>
        </AsyncBoundary>
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
`;

const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.spacing3};
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
`;
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#FF5A5A" : "none"}
    stroke={filled ? "#FF5A5A" : "#999"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const WishBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;

  .icon {
    font-size: 20px;
  }

  .count {
    font-size: ${({ theme }) => theme.typography.title1Regular};
    color: ${({ theme }) => theme.colors.textDefault};
    margin-top: 2px;
  }
`;

const OrderButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing3};
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  color: ${({ theme }) => theme.colors.textDefault};
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  border-radius: 2px;
`;
