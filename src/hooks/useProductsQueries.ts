import { fetchProductsDetail } from "@/api/productDetail";
import { fetchProducts } from "@/api/products";
import { fetchProductsReview } from "@/api/productsReview";
import { fetchProductsWish } from "@/api/productsWish";
import { useQueries } from "@tanstack/react-query";

type useProductsQueriesParams = {
  id: string;
};

const useProductsQueries = ({ id }: useProductsQueriesParams) => {
  const numberId = Number(id);
  const results = useQueries({
    queries: [
      {
        queryKey: ["products", id],
        queryFn: () => fetchProducts({ id: numberId }),
      },
      {
        queryKey: ["productsWish", id],
        queryFn: () => fetchProductsWish({ id: numberId }),
      },
      {
        queryKey: ["productsDetail", id],
        queryFn: () => fetchProductsDetail({ id: numberId }),
      },
      {
        queryKey: ["productsReview", id],
        queryFn: () => fetchProductsReview({ id: numberId }),
      },
    ],
  });
  const isPending = results.some(result => result.isPending);

  return {
    products: results[0].data,
    productsWish: results[1].data,
    productsDetail: results[2].data,
    productsReview: results[3].data,
    isPending,
  };
};

export default useProductsQueries;
