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

import * as S from "@/styles/ProductDetailStyles";

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
          <S.Wrapper>
            <S.Image src={product.imageURL} alt={product.name} />
            <S.Info>
              <S.Brand>{product.brandInfo.name}</S.Brand>
              <S.Name>{product.name}</S.Name>
              <S.Price>{product.price.sellingPrice.toLocaleString()}원</S.Price>
            </S.Info>
            <S.BrandInfo>
              <img
                src={product.brandInfo.imageURL}
                alt={product.brandInfo.name}
              />
              <span>{product.brandInfo.name}</span>
            </S.BrandInfo>

            <AsyncBoundary
              fallback={<div>상세 정보를 불러오는 중입니다...</div>}
              errorFallback={<div>상세 정보 로딩에 실패했어요.</div>}
              useErrorBoundary={false}
            >
              <DetailTab productId={product.id} />
            </AsyncBoundary>

            <S.StickyFooter>
              <PageContainer>
                <S.FooterInner>
                  <S.WishBox onClick={handleWishClick}>
                    <S.HeartIcon filled={wishData?.isWished ?? false} />
                    <span className="count">{wishData?.wishCount ?? 0}</span>
                  </S.WishBox>
                  <S.OrderButton onClick={() => goTo(`/order/${product.id}`)}>
                    주문하기
                  </S.OrderButton>
                </S.FooterInner>
              </PageContainer>
            </S.StickyFooter>
          </S.Wrapper>
        </AsyncBoundary>
      </PageContainer>
    </PageLayout>
  );
};

export default ProductDetail;
