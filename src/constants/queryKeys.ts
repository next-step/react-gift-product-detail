export const queryKeys = {
  // 'products' 도메인
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (target: string, rankType: string) => [...queryKeys.products.lists(), target, rankType] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.products.details(), id] as const,
  },
  // 'themes' 도메인
  themes: {
    all: ['themes'] as const,
    details: () => [...queryKeys.themes.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.themes.details(), id] as const,
    productLists: () => [...queryKeys.themes.all, 'products'] as const,
    productList: (id: number) => [...queryKeys.themes.productLists(), id] as const,
  },
};