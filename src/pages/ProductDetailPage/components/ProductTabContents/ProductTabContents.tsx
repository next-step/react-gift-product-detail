import { useState } from "react";
import {
  ProductInfoTabContainer,
  TabContentLayout,
  TabSwitcherContainer,
  TabSwitcherLabel,
  TabSwitcherRow,
} from "./ProductTabContents.styles";
import { TAB_LABELS } from "../../constants/tab";
import Info from "./Info";
import Review from "./Reivew";
import Detail from "./Detail";

const TAB_CONTENT = {
  TAB_INFO: "info",
  TAB_REVIEW: "review",
  TAB_DETAIL: "detail",
} as const;

type Tab = (typeof TAB_CONTENT)[keyof typeof TAB_CONTENT];

function TabContent({
  currentTab,
  productId,
}: {
  currentTab: Tab;
  productId: string;
}) {
  if (currentTab === TAB_CONTENT.TAB_INFO) {
    return <Info productId={productId} />;
  }
  if (currentTab === TAB_CONTENT.TAB_REVIEW) {
    return <Review productId={productId} />;
  }

  return <Detail productId={productId} />;
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
  const [currentTab, setCurrentTab] = useState<Tab>(TAB_CONTENT.TAB_INFO);

  return (
    <ProductInfoTabContainer>
      <TabSwitcherRow>
        <TabSwitcher
          label={TAB_LABELS.INFO}
          tab={TAB_CONTENT.TAB_INFO}
          isActive={currentTab === TAB_CONTENT.TAB_INFO}
          setCurrentTab={setCurrentTab}
        />
        <TabSwitcher
          label={TAB_LABELS.REVIEW}
          tab={TAB_CONTENT.TAB_REVIEW}
          isActive={currentTab === TAB_CONTENT.TAB_REVIEW}
          setCurrentTab={setCurrentTab}
        />
        <TabSwitcher
          label={TAB_LABELS.DETAIL}
          tab={TAB_CONTENT.TAB_DETAIL}
          isActive={currentTab === TAB_CONTENT.TAB_DETAIL}
          setCurrentTab={setCurrentTab}
        />
      </TabSwitcherRow>
      <TabContentLayout>
        <TabContent currentTab={currentTab} productId={productId} />
      </TabContentLayout>
    </ProductInfoTabContainer>
  );
}

export default ProductTabContents;
