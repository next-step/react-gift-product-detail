import { useQuery } from "@tanstack/react-query"
import ProductsResponseSingle from "@/interfaces/ProductResponseSingle"
import { AxiosError } from "axios"
import fetchHandler from "@/functions/fetchHandler"

function useProduct(productId?: string) {
  const { data, isLoading, error } = useQuery<
    ProductsResponseSingle,
    AxiosError
  >({
    queryKey: ["productInfo", productId],
    queryFn: () =>
      fetchHandler<ProductsResponseSingle>(`/api/products/${productId}`),
    enabled: !!productId,
  })

  return {
    product: data?.data,
    loading: isLoading,
    error,
  }
}
export default useProduct
