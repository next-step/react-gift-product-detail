import type { TabType } from "@/pages/product/section/ProductTabSection";

export const PRODUCT_TABS: { key: TabType; label: string }[] = [
  { key: "description", label: "상품설명" },
  { key: "review", label: "선물후기" },
  { key: "announcement", label: "상세정보" },
];
