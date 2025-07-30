export const Z_INDEX = {
  BASE: 0,
  COMPONENT: 1,
  NAVIGATION: 400,
  MODAL: 500,
  MODAL_OVERLAY: 501,
  FIXED_BOTTOM: 400,
} as const;

export type ZIndexKey = keyof typeof Z_INDEX;
