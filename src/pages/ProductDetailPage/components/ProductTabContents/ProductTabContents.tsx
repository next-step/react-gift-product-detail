import { useState } from "react";
import {
  ProductInfoTabContainer,
  TabSwitcherContainer,
  TabSwitcherLabel,
  TabSwitcherRow,
} from "./ProductTabContents.styles";
import { TAB_LABELS } from "../../constants/tab";
import Info from "./Info";

type Tab = "info" | "review" | "detail";

function TabContent({
  currentTab,
  productId,
}: {
  currentTab: Tab;
  productId: string;
}) {
  if (currentTab === "info") {
    return <Info productId={productId} />;
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

function ProductTabContents({ productId }: { productId: string }) {
  const [currentTab, setCurrentTab] = useState<Tab>("info");

  return (
    <ProductInfoTabContainer>
      <TabSwitcherRow>
        <TabSwitcher
          label={TAB_LABELS.INFO}
          tab="info"
          isActive={currentTab === "info"}
          setCurrentTab={setCurrentTab}
        />
        <TabSwitcher
          label={TAB_LABELS.REVIEW}
          tab="review"
          isActive={currentTab === "review"}
          setCurrentTab={setCurrentTab}
        />
        <TabSwitcher
          label={TAB_LABELS.DETAIL}
          tab="detail"
          isActive={currentTab === "detail"}
          setCurrentTab={setCurrentTab}
        />
      </TabSwitcherRow>
      <TabContent currentTab={currentTab} productId={productId} />
    </ProductInfoTabContainer>
  );
}

export default ProductTabContents;
