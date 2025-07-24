export const queryKeys = {
  // /api/themes~ 에서 사용할 쿼리 키
  themes: {
    all: ["themes"] as const,
    lists: () => [...queryKeys.themes.all, "list"] as const,
    list: () => [...queryKeys.themes.lists()] as const,
    details: () => [...queryKeys.themes.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.themes.details(), id] as const,
    products: () => [...queryKeys.themes.all, "products"] as const,
    productList: (themeId: number, limit: number) =>
      [...queryKeys.themes.products(), themeId, limit] as const,
  },
  // /api/product~ 에서 사용할 쿼리 키
  products: {
    all: ["products"] as const,
    rankings: () => [...queryKeys.products.all, "ranking"] as const,
    ranking: (targetType: string, rankType: string) =>
      [...queryKeys.products.rankings(), targetType, rankType] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.products.details(), id] as const,
    summary: (id: number) =>
      [...queryKeys.products.details(), id, "summary"] as const,
  },
};
