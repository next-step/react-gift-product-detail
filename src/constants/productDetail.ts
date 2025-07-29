export const PRODUCT_DETAIL_TABS = [
  '상품설명',
  '선물후기',
  '상세정보',
] as const;

export type ProductDetailTab = (typeof PRODUCT_DETAIL_TABS)[number];
