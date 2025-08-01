export const queryKeys = {
  // 'products' 도메인
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (target: string, rankType: string) => [...queryKeys.products.lists(), target, rankType] as const,
    infos: () => [...queryKeys.products.all, 'info'] as const,
    info: (id: number) => [...queryKeys.products.infos(), id] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.products.details(), id] as const,
    reviews: () => [...queryKeys.products.all, 'review'] as const,
    review: (id: number) => [...queryKeys.products.reviews(), id] as const,
    wishes: () => [...queryKeys.products.all, 'wish'] as const,
    wish: (id: number) => [...queryKeys.products.wishes(), id] as const,
    summaries: () => [...queryKeys.products.all, 'summary'] as const,
    summary: (id: number) => [...queryKeys.products.summaries(), id] as const,
  },
  // 'themes' 도메인
  themes: {
    all: ['themes'] as const,
    lists: () => [...queryKeys.themes.all, 'list'] as const, // 추가
    details: () => [...queryKeys.themes.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.themes.details(), id] as const,
    productLists: () => [...queryKeys.themes.all, 'products'] as const,
    productList: (id: number) => [...queryKeys.themes.productLists(), id] as const,
  },
};