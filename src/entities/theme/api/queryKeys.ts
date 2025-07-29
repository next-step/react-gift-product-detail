export const themeQueryKeys = {
    all: ['theme'] as const,
    info: (themeId: number) => ['themeInfo', themeId] as const,
    products: (themeId: number) => ['themeProducts', themeId] as const,
} as const;