import { api } from "@/app/lib/api";

import type { GiftModel } from "@/entities/gift/model/GiftModel";
import { GIFT_QUERY_KEYS } from "@/entities/gift/services/_keys";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetProductSummaryByIdResponse extends Omit<GiftModel, "price" | "brandInfo"> {
    price: number;
    brandName: string;
}

export async function getProductSummary(productId: number) {
    const { data: response } = await api.get<BaseResponse<GetProductSummaryByIdResponse>>(
        `/products/${productId}/summary`,
    );
    return response.data;
}

export const useProductSummaryByProductId = (productId: number) => {
    const { data, error, refetch } = useSuspenseQuery({
        queryKey: GIFT_QUERY_KEYS.PRODUCT_SUMMARY_BY_ID(productId),
        queryFn: () => getProductSummary(productId),
    });

    return {
        data,
        error,
        request: refetch,
    };
};
