import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { RecipientType } from "@/pages/Order/components/Order";

export interface PostOrderParams {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: RecipientType[];
}

interface PostOrderResponse {
  data: {
    success: boolean;
  };
}

export const postOrder = async (params: PostOrderParams): Promise<PostOrderResponse> => {
  const response = await apiInstance.post<PostOrderResponse>(API_ENDPOINTS.ORDER, params);
  return response.data;
};

export default postOrder;
