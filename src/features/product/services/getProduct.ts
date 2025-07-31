import { PRODUCT_QUERY_KEYS } from "@/features/product/services/_keys";
import { getProductDetailByProductId } from "@/features/product/services/getProductDetailByProductId";
import { getProductInfoByProductId } from "@/features/product/services/getProductInfoByProductId";
import { getProductReviewByProductId } from "@/features/product/services/getProductReviewByProductId";

import { useSuspenseQueries } from "@tanstack/react-query";

export const useGetProduct = (productId: number) => {
    return useSuspenseQueries({
        queries: [
            {
                queryKey: PRODUCT_QUERY_KEYS.PRODUCT_INFO_BY_ID(productId),
                queryFn: () => getProductInfoByProductId(productId),
            },
            {
                queryKey: PRODUCT_QUERY_KEYS.PRODUCT_REVIEW_BY_ID(productId),
                queryFn: () => getProductReviewByProductId(productId),
            },
            {
                queryKey: PRODUCT_QUERY_KEYS.PRODUCT_DETAIL_BY_ID(productId),
                queryFn: () => getProductDetailByProductId(productId),
            },
        ],
    });
};
