import { isAxiosError } from "axios";

import { api } from "@/app/lib/api";

import { PRODUCT_QUERY_KEYS } from "@/features/product/services/_keys";

import { HTTPExceptionAdapter } from "@/shared/errors/HTTPExceptionAdapter";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetProductDetailByProductIdResponseBody {
    description: "상품 상세 설명";
    announcements: Array<{
        name: string;
        value: string;
        displayOrder: number;
    }>;
}

export async function getProductDetailByProductId(productId: number) {
    try {
        const { data: response } = await api.get<
            BaseResponse<GetProductDetailByProductIdResponseBody>
        >(`/products/${productId}/detail`);
        return response.data;
    } catch (error) {
        if (!isAxiosError(error)) throw error;
        throw HTTPExceptionAdapter.fromAxiosError(error);
    }
}

export const useGetProductDetailByProductId = (productId: number) => {
    return useSuspenseQuery({
        queryKey: PRODUCT_QUERY_KEYS.PRODUCT_DETAIL_BY_ID(productId),
        queryFn: () => getProductDetailByProductId(productId),
    });
};
