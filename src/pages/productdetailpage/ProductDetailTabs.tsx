/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from "react";

type TabValue = "description" | "reviews" | "details";

interface ProductDetailTabsProps {
  activeTab: TabValue;
  onTabClick: (tab: TabValue) => void;
}

const ProductDetailTabs = ({
  activeTab,
  onTabClick,
}: ProductDetailTabsProps) => {
  return (
    <TabsContainer>
      <TabButton
        isActive={activeTab === "description"}
        onClick={() => onTabClick("description")}
      >
        상품설명
      </TabButton>
      <TabButton
        isActive={activeTab === "reviews"}
        onClick={() => onTabClick("reviews")}
      >
        선물후기
      </TabButton>
      <TabButton
        isActive={activeTab === "details"}
        onClick={() => onTabClick("details")}
      >
        상세정보
      </TabButton>
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  margin-top: 20px;
`;

interface TabButtonProps {
  isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 15px 0;
  border: none;
  background-color: white;
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  color: ${(props) =>
    props.isActive ? props.theme.colors.gray1000 : props.theme.colors.gray600};
  border-bottom: ${(props) =>
    props.isActive ? `2px solid ${props.theme.colors.gray1000}` : "none"};
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

export default ProductDetailTabs;
