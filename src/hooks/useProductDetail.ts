import { useSuspenseQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import fetchHandler from "@/functions/fetchHandler"
import { ProductDetailResponse } from "@/interfaces/ProductDetailResponse"

export default function useProductDetail(productId?: string) {
  return useSuspenseQuery<
    ProductDetailResponse,
    AxiosError,
    ProductDetailResponse["data"]
  >({
    queryKey: ["productDetail", productId],
    queryFn: () =>
      fetchHandler<ProductDetailResponse>(`/api/products/${productId}/detail`),
    select: (res) => res.data,
  })
}
