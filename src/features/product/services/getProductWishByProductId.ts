import { isAxiosError } from "axios";

import { api } from "@/app/lib/api";

import { PRODUCT_QUERY_KEYS } from "@/features/product/services/_keys";

import { HTTPExceptionAdapter } from "@/shared/errors/HTTPExceptionAdapter";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetProductWishByProductId {
    wishCount: number;
    isWished: boolean;
}

export async function getProductWishByProductId(productId: number) {
    try {
        const { data: response } = await api.get<BaseResponse<GetProductWishByProductId>>(
            `/products/${productId}/wish`,
        );
        return response.data;
    } catch (error) {
        if (!isAxiosError(error)) throw error;
        throw HTTPExceptionAdapter.fromAxiosError(error);
    }
}

export const useGetProductWishByProductId = (productId: number) => {
    return useSuspenseQuery({
        queryKey: PRODUCT_QUERY_KEYS.PRODUCT_WISH_BY_ID(productId),
        queryFn: () => getProductWishByProductId(productId),
    });
};
