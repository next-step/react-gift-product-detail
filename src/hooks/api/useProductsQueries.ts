import { fetchProductsDetail } from "@/api/productDetail";
import { fetchProducts } from "@/api/products";
import { fetchProductsReview } from "@/api/productsReview";
import { fetchProductsWish } from "@/api/productsWish";
import { useSuspenseQueries } from "@tanstack/react-query";

type useProductsQueriesParams = {
  id: string;
};

const useProductsQueries = ({ id }: useProductsQueriesParams) => {
  const numberId = Number(id);
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: ["products", numberId],
        queryFn: () => fetchProducts({ id: numberId }),
      },
      {
        queryKey: ["productsWish", numberId],
        queryFn: () => fetchProductsWish({ id: numberId }),
      },
      {
        queryKey: ["productsDetail", numberId],
        queryFn: () => fetchProductsDetail({ id: numberId }),
      },
      {
        queryKey: ["productsReview", numberId],
        queryFn: () => fetchProductsReview({ id: numberId }),
      },
    ],
  });

  return {
    products: results[0].data,
    productsWish: results[1].data,
    productsDetail: results[2].data,
    productsReview: results[3].data,
  };
};

export default useProductsQueries;
