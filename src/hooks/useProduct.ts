import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import fetchHandler from "@/functions/fetchHandler"
import ProductsResponseNormal from "@/interfaces/ProductResponseNormal"

function useProduct(productId?: string) {
  const { data, isLoading, error } = useQuery<
    ProductsResponseNormal,
    AxiosError
  >({
    queryKey: ["product", productId],
    queryFn: () =>
      fetchHandler<ProductsResponseNormal>(`/api/products/${productId}`),
    enabled: !!productId,
  })

  return {
    product: data?.data,
    loading: isLoading,
    error,
  }
}
export default useProduct
