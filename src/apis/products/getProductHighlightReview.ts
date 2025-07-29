import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ProductHighlightReviews } from "@/types/ProductType";
import { generatePath } from "react-router-dom";

export const getProductHighlightReview = async (params: { productId: string }): Promise<ProductHighlightReviews> => {
  const response = await apiInstance.get<ProductHighlightReviews>(
    generatePath(API_ENDPOINTS.PRODUCT_HIGHLIGHT_REVIEW, { productId: params.productId }),
  );
  return response.data;
};

export default getProductHighlightReview;
