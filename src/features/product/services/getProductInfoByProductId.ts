import { isAxiosError } from "axios";

import { api } from "@/app/lib/api";

import { PRODUCT_QUERY_KEYS } from "@/features/product/services/_keys";

import { HTTPExceptionAdapter } from "@/shared/errors/HTTPExceptionAdapter";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetProductInfoByProductIdResponseBody {
    id: number;
    name: string;
    price: {
        basicPrice: number;
        sellingPrice: number;
        discountRate: number;
    };
    imageURL: string;
    brandInfo: {
        id: number;
        name: string;
        imageURL: string;
    };
}

export async function getProductInfoByProductId(productId: number) {
    try {
        const { data: response } = await api.get<
            BaseResponse<GetProductInfoByProductIdResponseBody>
        >(`/products/${productId}`);
        return response.data;
    } catch (error) {
        if (!isAxiosError(error)) throw error;
        throw HTTPExceptionAdapter.fromAxiosError(error);
    }
}

export const useGetProductInfoByProductId = (productId: number) => {
    return useSuspenseQuery({
        queryKey: PRODUCT_QUERY_KEYS.PRODUCT_INFO_BY_ID(productId),
        queryFn: () => getProductInfoByProductId(productId),
    });
};
