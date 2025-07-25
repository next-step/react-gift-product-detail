export const queryKeys = {
  giftProduct: (id: number) => ['giftProduct', id] as const,
  giftRanking: (filter: string, tab: string) =>
    ['giftRanking', filter, tab] as const,
  giftThemes: ['giftThemes'] as const,
  themeInfo: (themeId: number) => ['themeInfo', themeId] as const,
};
