import { api } from "@/shared/lib/api";
import type { RankType, TargetType, RankingProduct, ProductSummary, ProductDetail, ProductHighlightReview, ProductWish } from "../model/types";

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

export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
    const response = await api.get<{data: ProductDetail}>(`/products/${productId}/detail`);
    return response.data.data;
}

export const getProductHighlightReview = async (productId: number): Promise<ProductHighlightReview> => {
    const response = await api.get<{data: ProductHighlightReview}>(`/products/${productId}/highlight-review`);
    return response.data.data;
}

export const getProductWish = async (productId: number): Promise<ProductWish> => {
    const response = await api.get<{data: ProductWish}>(`/products/${productId}/wish`);
    return response.data.data;
}