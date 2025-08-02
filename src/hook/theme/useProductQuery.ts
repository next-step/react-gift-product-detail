import { useQuery } from '@tanstack/react-query';
import { getFromUrl } from '@/utils/getFromUrl';
import { type ProductItemFromTheme } from '@/type/GiftAPI/product';
import { getproductsbyCursorUrl } from '@/utils/getApiUrl';

export function useProductQuery(themeId: string | undefined, cursor: number) {
  const productsUrl = getproductsbyCursorUrl(themeId, cursor);

  return useQuery<ProductItemFromTheme>({
    queryKey: ['productListData', productsUrl],
    queryFn: () => getFromUrl(productsUrl),
    placeholderData: (prev) => prev,
    enabled: !!themeId,
  });
}

