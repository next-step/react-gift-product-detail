import apiClient from '@/apis/apiClient';
import type {
  // RankItemType,
  ProductDetailResponseDto,
  ProductSummaryRequestDTO,
  ProductSummaryResponseDTO,
  RankingQuery,
  ProductSummary,
  ProductBasicInfo,
  ProductBasicInfoResponseDTO,
  ProductDetailInfo,
  ProductDetailInfoResponseDTO,
  ProductWishInfo,
  ProductWishInfoResponseDTO,
  ProductHighlightReview,
  ProductHighlightReviewResponseDTO,
} from '@/types/DTO/productDTO';

export async function getRanking({ targetType, rankType }: RankingQuery): Promise<ProductBasicInfo[]> {
  const response = await apiClient.get<ProductDetailResponseDto>('/products/ranking', {
    params: {
      targetType: targetType,
      rankType: rankType,
    },
  });
  return response.data.data;
}
export async function getSummary({ productId }: ProductSummaryRequestDTO): Promise<ProductSummary> {
  const response = await apiClient.get<ProductSummaryResponseDTO>(`/products/${productId}/summary`);
  return response.data.data;
}

export async function getProductBasicInfo(productId: number): Promise<ProductBasicInfo> {
  const response = await apiClient.get<ProductBasicInfoResponseDTO>(`/products/${productId}`);
  return response.data.data;
}

export async function getProductDetailInfo(productId: number): Promise<ProductDetailInfo> {
  const response = await apiClient.get<ProductDetailInfoResponseDTO>(`/products/${productId}/detail`);
  return response.data.data;
}

export async function getProductWishInfo(productId: number): Promise<ProductWishInfo> {
  const response = await apiClient.get<ProductWishInfoResponseDTO>(`/products/${productId}/wish`);
  return response.data.data;
}

export async function getProductHighlightReview(productId: number): Promise<ProductHighlightReview> {
  const response = await apiClient.get<ProductHighlightReviewResponseDTO>(`/products/${productId}/highlight-review`);
  return response.data.data;
}
