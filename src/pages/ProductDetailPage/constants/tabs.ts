export const TAB_LIST = [
  { key: 'description', label: '상품설명' },
  { key: 'review', label: '선물후기' },
  { key: 'detail', label: '상세정보' },
] as const;

export type TabKey = (typeof TAB_LIST)[number]['key'];
