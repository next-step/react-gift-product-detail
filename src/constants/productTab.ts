export const TABS = ["상품설명", "상품후기", "상세정보"] as const;

export type Tab = (typeof TABS)[number];
