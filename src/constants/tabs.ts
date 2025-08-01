export const PRODUCT_TABS = {
  DESCRIPTION: "description",
  REVIEW: "review",
  INFO: "info",
} as const;

export type ProductTab = (typeof PRODUCT_TABS)[keyof typeof PRODUCT_TABS];
