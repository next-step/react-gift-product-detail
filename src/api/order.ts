import type { OrderRequest, OrderResponse, OrderError } from "../types/product";
import { useMutation } from "@tanstack/react-query";

// 기존 API 함수 (React Query hook에서 사용)
export const createOrder = async (
  orderData: OrderRequest,
  authToken: string,
): Promise<OrderResponse> => {
  const response = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();
  console.log("[API] /api/order 응답:", data);

  if (!response.ok) {
    const error: OrderError = {
      message: data.message || "주문에 실패했습니다.",
      status: response.status,
    };
    throw error;
  }

  return data;
};

// React Query Hook
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: ({ orderData, authToken }: { orderData: OrderRequest; authToken: string }) =>
      createOrder(orderData, authToken),
    onSuccess: (data) => {
      console.log("주문 생성 성공:", data);
      // 주문 성공 시 필요한 처리 (예: 주문 완료 페이지로 이동, 장바구니 비우기 등)
    },
    onError: (error: OrderError) => {
      console.error("주문 생성 실패:", error);
      // 주문 실패 시 필요한 처리 (예: 에러 메시지 표시 등)
    },
  });
};
