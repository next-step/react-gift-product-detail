import { useQuery } from "@tanstack/react-query"
import ProductsResponseSingle from "@/interfaces/ProductResponseSingle"
import { AxiosError } from "axios"
import fetchHandler from "@/functions/fetchHandler"

function useProductInfo(productId?: string) {
  const { data, isLoading, error } = useQuery<
    ProductsResponseSingle,
    AxiosError
  >({
    queryKey: ["productInfo", productId],
    queryFn: () =>  fetchHandler<ProductsResponseSingle>(`/api/products/${productId}/summary`),
    enabled: !!productId,
  })
 
  return {
    product: data?.data,
    loading: isLoading,
    error,
  }
}
export default useProductInfo
