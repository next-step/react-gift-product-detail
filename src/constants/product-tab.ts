export const PRODUCT_DETAIL_TABS = {
  DESCRIPTION: "description",
  REVIEW: "review",
  DETAILS: "details",
} as const;

export type ProductDetailTabId =
  (typeof PRODUCT_DETAIL_TABS)[keyof typeof PRODUCT_DETAIL_TABS];

export type TabItem = {
  id: ProductDetailTabId;
  label: string;
};

export const PRODUCT_DETAIL_TAB_LIST: TabItem[] = [
  { id: PRODUCT_DETAIL_TABS.DESCRIPTION, label: "상품설명" },
  { id: PRODUCT_DETAIL_TABS.REVIEW, label: "선물후기" },
  { id: PRODUCT_DETAIL_TABS.DETAILS, label: "상세정보" },
];
