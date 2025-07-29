import { useQuery } from "@tanstack/react-query"
import ProductsResponseSingle from "@/interfaces/ProductResponseSingle"
import { AxiosError } from "axios"
import useFetch from "./useFetch"
function useProductInfo(productId?: string) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const url = productId
    ? new URL(`/api/products/${productId}/summary`, baseUrl).toString()
    : ""

  const { data, isLoading, error } = useQuery<
    ProductsResponseSingle,
    AxiosError
  >({
    queryKey: ["productInfo", productId],
    queryFn: () => useFetch<ProductsResponseSingle>(url),
    enabled: !!productId,
  })

  return {
    product: data?.data,
    loading: isLoading,
    error,
  }
}
export default useProductInfo
