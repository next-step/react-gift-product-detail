import { api } from "@/shared/lib/api";
import type { OrderRequest, OrderResponse } from "../model/types";
import type { ApiResponse } from "@/shared/types";

export const createOrder = async (orderData: OrderRequest, authToken: string): Promise<OrderResponse> => {
    const response = await api.post<ApiResponse<OrderResponse>>("/order", orderData, {
        headers: {
            Authorization: authToken
        }
    });
    return response.data.data;
} 