import {
  PRODUCT_DETAIL_TAB_LIST,
  PRODUCT_DETAIL_TABS,
  type ProductDetailTabId,
} from "@/constants";
import styled from "@emotion/styled";
import { useState } from "react";

const TabContainer = styled.div(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.color.gray[0],
  borderBottom: `1px solid ${theme.color.gray[300]}`,
}));

const TabButton = styled.button<{ isActive: boolean }>(
  ({ theme, isActive }) => ({
    flex: 1,
    padding: theme.spacing4,
    fontSize: theme.typography.body1Regular.fontSize,
    fontWeight: theme.typography.body1Regular.fontWeight,
    lineHeight: theme.typography.body1Regular.lineHeight,
    color: isActive ? theme.color.gray[900] : theme.color.gray[600],
    backgroundColor: "transparent",
    border: "none",
    borderBottom: isActive
      ? `2px solid ${theme.color.gray[900]}`
      : "2px solid transparent",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.color.gray[100],
    },
  }),
);

interface ProductDetailTabProps {
  activeTab?: ProductDetailTabId;
  onTabChange?: (tabId: ProductDetailTabId) => void;
}

export const ProductDetailTab = ({
  activeTab = PRODUCT_DETAIL_TABS.DESCRIPTION,
  onTabChange,
}: ProductDetailTabProps) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabClick = (tabId: ProductDetailTabId) => {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <TabContainer>
      {PRODUCT_DETAIL_TAB_LIST.map(tab => (
        <TabButton
          key={tab.id}
          isActive={selectedTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};
