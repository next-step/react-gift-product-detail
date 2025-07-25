import styled from "@emotion/styled";
import { useState } from "react";

const ProductInfoTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const TabSwitcherContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1.2rem;
  border-bottom: ${({ isActive }) => (isActive ? "2px solid black" : "none")};
  cursor: pointer;
`;

const TabSwitcherRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TabSwitcherLabel = styled.p<{ isActive: boolean }>`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
  text-align: center;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
`;

type Tab = "info" | "review" | "detail";

function TabContent({ currentTab }: { currentTab: Tab }) {
  if (currentTab === "info") {
    return <div>info</div>;
  }
  if (currentTab === "review") {
    return <div>review</div>;
  }

  return <div>detail</div>;
}

function TabSwitcher({
  label,
  tab,
  isActive,
  setCurrentTab,
}: {
  label: string;
  tab: Tab;
  isActive: boolean;
  setCurrentTab: (tab: Tab) => void;
}) {
  return (
    <TabSwitcherContainer
      isActive={isActive}
      onClick={() => setCurrentTab(tab)}
    >
      <TabSwitcherLabel isActive={isActive}>{label}</TabSwitcherLabel>
    </TabSwitcherContainer>
  );
}

function ProductTabContents() {
  const [currentTab, setCurrentTab] = useState<Tab>("info");

  return (
    <ProductInfoTabContainer>
      <TabSwitcherRow>
        <TabSwitcher
          label="상품설명"
          tab="info"
          isActive={currentTab === "info"}
          setCurrentTab={setCurrentTab}
        />
        <TabSwitcher
          label="선물후기"
          tab="review"
          isActive={currentTab === "review"}
          setCurrentTab={setCurrentTab}
        />
        <TabSwitcher
          label="상세정보"
          tab="detail"
          isActive={currentTab === "detail"}
          setCurrentTab={setCurrentTab}
        />
      </TabSwitcherRow>
      <TabContent currentTab={currentTab} />
    </ProductInfoTabContainer>
  );
}

export default ProductTabContents;
