// * 상품 UI 관련 상수
export const PRODUCT_UI_CONSTANTS = {
  INITIAL_SHOW_COUNT: 6,
} as const

// * 상품 탭 관련 상수
export const PRODUCT_TAB_CONSTANTS = [
  { id: 'description', label: '상품설명' },
  { id: 'reviews', label: '선물후기' },
  { id: 'details', label: '상세정보' },
] as const

// * 탭 타입 정의
export type TabType = (typeof PRODUCT_TAB_CONSTANTS)[number]['id']
