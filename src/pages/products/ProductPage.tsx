import ProductDescriptionSection from "@/pages/products/components/ProductDescriptionSection";
import ProductDetailSection from "@/pages/products/components/ProductDetailSection";
import ProductInfoSection from "@/pages/products/components/ProductInfoSection";
import ProductOrderSection from "@/pages/products/components/ProductOrderSection";
import ProductReviewSection from "@/pages/products/components/ProductReviewSection";
import { TABS } from "@/constants/productTab";
import type { Tab } from "@/constants/productTab";
import withSuspenseBoundary from "@/hoc/withSuspenseBoundary";
import withUser from "@/hoc/withUser";
import useProductsQueries from "@/api/hooks/useProductsQueries";
import { wrapper } from "@/utils/wrapper";
import styled from "@emotion/styled";
import { useState } from "react";
import { useParams } from "react-router";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, productsWish, productsDetail, productsReview } =
    useProductsQueries({ id: id ?? "" });

  const [tab, setTab] = useState<Tab>(TABS[0]);
  const selectTab = (tabName: Tab) => {
    setTab(tabName);
  };

  return (
    <Main>
      <ProductInfoSection
        name={products.name}
        imageURL={products.imageURL}
        price={products.price.sellingPrice}
        brandName={products.brandInfo.name}
        brandImageURL={products.brandInfo.imageURL}
      />
      <Tab>
        {TABS.map(tabItem => (
          <TabButton
            key={tabItem}
            onClick={() => selectTab(tabItem)}
            selected={tab === tabItem}
          >
            {tabItem}
          </TabButton>
        ))}
      </Tab>
      {tab === "상품설명" && (
        <ProductDescriptionSection description={productsDetail.description} />
      )}
      {tab === "상품후기" && (
        <ProductReviewSection reviews={productsReview.reviews} />
      )}
      {tab === "상세정보" && (
        <ProductDetailSection announcements={productsDetail.announcements} />
      )}
      <ProductOrderSection {...productsWish} productId={id} />
    </Main>
  );
};

export default wrapper([withUser, withSuspenseBoundary(true)], ProductPage);

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
