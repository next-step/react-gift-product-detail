import LoadingSpinner from "@/components/common/LoadingSpinner";
import TheHeader from "@/components/layout/TheHeader";
import ProductDescriptionSection from "@/components/products/ProductDescriptionSection";
import ProductDetailSection from "@/components/products/ProductDetailSection";
import ProductInfoSection from "@/components/products/ProductInfoSection";
import ProductReviewSection from "@/components/products/ProductReviewSection";
import withUser from "@/hoc/withUser";
import useProductsQueries from "@/hooks/useProductsQueries";
import styled from "@emotion/styled";
import { useState } from "react";
import { useParams } from "react-router";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, productsWish, productsDetail, productsReview, isPending } =
    useProductsQueries({ id: id ?? "" });

  const [tab, setTab] = useState("상품설명");
  const selectTab = (tabName: string) => {
    setTab(tabName);
  };

  if (
    !products ||
    !productsWish ||
    !productsDetail ||
    !productsReview ||
    isPending
  ) {
    return <LoadingSpinner height="266px" />;
  }

  return (
    <>
      <TheHeader />
      <Main>
        <ProductInfoSection
          name={products.name}
          imageURL={products.imageURL}
          price={products.price.sellingPrice}
          brandName={products.brandInfo.name}
          brandImageURL={products.brandInfo.imageURL}
        />
        <Tab>
          <TabButton
            onClick={() => selectTab("상품설명")}
            selected={tab === "상품설명"}
          >
            상품설명
          </TabButton>
          <TabButton
            onClick={() => selectTab("상품후기")}
            selected={tab === "상품후기"}
          >
            상품후기
          </TabButton>
          <TabButton
            onClick={() => selectTab("상세정보")}
            selected={tab === "상세정보"}
          >
            상세정보
          </TabButton>
        </Tab>
        {tab === "상품설명" && (
          <ProductDescriptionSection description={productsDetail.description} />
        )}
        {tab === "상품후기" && (
          <ProductReviewSection reviews={productsReview.reviews} />
        )}
        {tab === "상세정보" && <ProductDetailSection />}
      </Main>
    </>
  );
};

export default withUser(ProductPage);

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
  height: 100%;
  min-height: calc(100vh - 44px);
`;

const Tab = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray300};
  margin-top: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;

const TabButton = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  padding: ${({ theme }) =>
    `${theme.spacing.spacing4} ${theme.spacing.spacing5}`};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.sub};
  border: none;
  cursor: pointer;

  ${({ selected, theme }) =>
    selected
      ? `
        color: ${theme.colors.semantic.text.default};
        border-bottom: 2px solid ${theme.colors.semantic.text.default};
      `
      : `
        &:hover {
          background-color: ${theme.colors.gray.gray100};
        }
      `}
`;
