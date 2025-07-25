import { orders } from '@/entities/order/model/constants';

// 기본 카드 상태 상수
export const DEFAULT_CARD_STATE = {
  selectedCardId: orders[0]?.id || 904,
  message: orders[0]?.defaultTextMessage || '축하해요.',
};

// 폼 데이터 기본값
export const DEFAULT_FORM_DATA = {
  senderName: '',
};

// 에러 메시지 상수
export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: '상품 정보를 불러올 수 없습니다.',
  LOGIN_REQUIRED: '로그인이 필요합니다.',
  VALIDATION_FAILED: '유효성 검사에 실패했습니다.',
  ORDER_PROCESSING_ERROR: '주문 처리 중 오류가 발생했습니다.',
} as const;

// 성공 메시지 상수
export const SUCCESS_MESSAGES = {
  ORDER_COMPLETED: '주문이 완료되었습니다.',
} as const;

// 주문 정보 템플릿
export const ORDER_INFO_TEMPLATE = {
  PRODUCT_NAME: '상품명',
  QUANTITY: '구매수량',
  SENDER_NAME: '발신자이름',
  RECEIVERS: '받는사람',
  MESSAGE: '메시지',
} as const;