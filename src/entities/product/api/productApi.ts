import { api } from "@/shared/lib/api";
import type { RankType, TargetType, RankingProduct, ProductSummary } from "../model/types";

export const getRankingProducts = async (targetType: TargetType = 'ALL', rankType: RankType = 'MANY_WISH'): Promise<RankingProduct[]> => {
    const response = await api.get<{data: RankingProduct[]}>("/products/ranking", {
        params: {
            targetType,
            rankType
        }
    });
    return response.data.data;
}

export const getProductSummary = async (productId: number): Promise<ProductSummary> => {
    const response = await api.get<{data: ProductSummary}>(`/products/${productId}/summary`);
    return response.data.data;
}

export const getProductById = async (productId: number): Promise<RankingProduct> => {
    const response = await api.get<{data: RankingProduct}>(`/products/${productId}`);
    return response.data.data;
}