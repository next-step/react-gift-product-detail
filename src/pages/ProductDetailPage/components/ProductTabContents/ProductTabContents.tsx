import { Suspense, useState } from "react";
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
import {
  getProductDetail,
  getProductDetailInfo,
  getProductHighlightReview,
} from "@/data/api";
import { useSuspenseQueries } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import { Loading } from "@/components/Loading/Loading";
import ErrorBoundary from "@/components/Error/ErrorBoundary/ErrorBoundary";
import { FallbackMessage } from "@/components/Error/FallbackMessage/FallbackMessage";
import { PRODUCT_DETAIL_LABELS } from "../../constants/labels";

const TAB_CONTENT = {
  TAB_INFO: "info",
  TAB_REVIEW: "review",
  TAB_DETAIL: "detail",
} as const;

type Tab = (typeof TAB_CONTENT)[keyof typeof TAB_CONTENT];

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
        <ErrorBoundary
          fallback={
            <FallbackMessage
              message={PRODUCT_DETAIL_LABELS.NO_PRODUCT_DETAIL}
            />
          }
        >
          <Suspense fallback={<Loading />}>
            <TabContent currentTab={currentTab} productId={productId} />
          </Suspense>
        </ErrorBoundary>
      </TabContentLayout>
    </ProductInfoTabContainer>
  );
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

function TabContent({
  currentTab,
  productId,
}: {
  currentTab: Tab;
  productId: string;
}) {
  const [{ data: infoData }, { data: reviewData }, { data: detailData }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: QUERY_KEY.PRODUCT_DETAIL(productId),
          queryFn: () => getProductDetail(productId),
        },
        {
          queryKey: QUERY_KEY.PRODUCT_HIGHLIGHT_REVIEW(productId),
          queryFn: () => getProductHighlightReview(productId),
        },
        {
          queryKey: QUERY_KEY.PRODUCT_DETAIL_INFO(productId),
          queryFn: () => getProductDetailInfo(productId),
        },
      ],
    });

  if (currentTab === TAB_CONTENT.TAB_INFO) {
    return <Info product={infoData} />;
  }
  if (currentTab === TAB_CONTENT.TAB_REVIEW) {
    return <Review product={reviewData} />;
  }

  return <Detail product={detailData} />;
}

export default ProductTabContents;
