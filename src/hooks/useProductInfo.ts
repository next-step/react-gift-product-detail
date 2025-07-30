import { useQuery } from "@tanstack/react-query"
import ProductsResponseSingle from "@/interfaces/ProductResponseSingle"
import { AxiosError } from "axios"
import axiosInstance from "@/utils/axiosInstance"

function useProductInfo(productId?: string) {
  const { data, isLoading, error } = useQuery<
    ProductsResponseSingle,
    AxiosError
  >({
    queryKey: ["productInfo", productId],
    queryFn: () => axiosInstance.get<ProductsResponseSingle>(`/api/products/${productId}/summary`).then((res) => res.data),
    enabled: !!productId,
  })

  return {
    product: data?.data,
    loading: isLoading,
    error,
  }
}
export default useProductInfo
