import { isAxiosError } from "axios";

import { api } from "@/app/lib/api";

import { PRODUCT_QUERY_KEYS } from "@/features/product/services/_keys";

import { HTTPExceptionAdapter } from "@/shared/errors/HTTPExceptionAdapter";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface ProductReview {
    id: string;
    authorName: string;
    content: string;
}

export interface GetProductReviewByProductIdResponseBody {
    totalCount: number;
    reviews: ProductReview[];
}

export async function getProductReviewByProductId(productId: number) {
    try {
        const { data: response } = await api.get<
            BaseResponse<GetProductReviewByProductIdResponseBody>
        >(`/products/${productId}/highlight-review`);
        return response.data;
    } catch (error) {
        if (!isAxiosError(error)) throw error;
        throw HTTPExceptionAdapter.fromAxiosError(error);
    }
}

export const useGetProductReviewByProductId = (productId: number) => {
    return useSuspenseQuery({
        queryKey: PRODUCT_QUERY_KEYS.PRODUCT_REVIEW_BY_ID(productId),
        queryFn: () => getProductReviewByProductId(productId),
    });
};
