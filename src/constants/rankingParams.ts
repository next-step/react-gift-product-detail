export const TARGET_TYPE_META = {
  ALL: { emoji: 'ALL', label: '전체' },
  FEMALE: { emoji: '👩🏻', label: '여성이' },
  MALE: { emoji: '👨🏻', label: '남성이' },
  TEEN: { emoji: '👦🏻', label: '청소년이' },
} as const;

export const RANK_TYPE_META = {
  MANY_WISH: { label: '받고 싶어한' },
  MANY_RECEIVE: { label: '많이 선물한' },
  MANY_WISH_RECEIVE: { label: '위시로 받은' },
} as const;

export type TargetType = keyof typeof TARGET_TYPE_META;
export type RankType = keyof typeof RANK_TYPE_META;

export const TARGET_TYPE_VALUES = Object.keys(TARGET_TYPE_META) as TargetType[];
export const RANK_TYPE_VALUES = Object.keys(RANK_TYPE_META) as RankType[];

export const DEFAULT_VALUES = {
  targetType: 'ALL' as TargetType,
  rankType: 'MANY_WISH' as RankType,
};
