import styled from "@emotion/styled";
import { useState } from "react";

type TabItem = {
  id: string;
  label: string;
};

const tabs: TabItem[] = [
  { id: "description", label: "상품설명" },
  { id: "review", label: "선물후기" },
  { id: "details", label: "상세정보" },
];

const TabContainer = styled.div(({ theme }) => ({
  display: "flex",
  backgroundColor: "#fff",
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
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const ProductDetailTab = ({
  activeTab = "description",
  onTabChange,
}: ProductDetailTabProps) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <TabContainer>
      {tabs.map(tab => (
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
