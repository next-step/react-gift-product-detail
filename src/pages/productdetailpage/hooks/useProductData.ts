import { useSuspenseApiQuery } from "@/hooks/useSuspenseApiQuery";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import type { Product, ProductDetail, ProductHighlightReview, ProductWish } from "@/types/api_types";

interface UseProductDataResult {
  productInfo: Product | undefined;
  productDetail: ProductDetail | undefined;
  highlightReview: ProductHighlightReview | undefined;
  wishCount: ProductWish | undefined;
}

export function useProductData(productId: string): UseProductDataResult {
  const { data: productInfo } = useSuspenseApiQuery<Product>({
    url: API_ENDPOINTS.PRODUCT(productId),
    queryKey: ["product-info", productId],
  });

  const { data: productDetail } = useSuspenseApiQuery<ProductDetail>({
    url: API_ENDPOINTS.PRODUCT_DETAIL(productId),
    queryKey: ["product-detail", productId],
  });

  const { data: highlightReview } = useSuspenseApiQuery<ProductHighlightReview>({
    url: API_ENDPOINTS.PRODUCT_HIGHLIGHT_REVIEW(productId),
    queryKey: ["product-highlight-review", productId],
  });

  const { data: wishCount } = useSuspenseApiQuery<ProductWish>({
    url: API_ENDPOINTS.PRODUCT_WISH(productId),
    queryKey: ["product-wish", productId],
  });

  return {
    productInfo,
    productDetail,
    highlightReview,
    wishCount,
  };
}
