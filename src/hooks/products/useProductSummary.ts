import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductSummary } from "@/api/product";
import { queryKeys } from "@/lib/query-keys";
import { useRouter } from "@/hooks/common/useRouter";
import { showToast } from "@/utils";
import { API_ERROR_MESSAGE } from "@/constants";
import { ApiError, UnauthorizedError } from "@/api/custom-error";

export const useProductSummary = () => {
  const { id } = useParams<{ id: string }>();
  const { goHomePage, goLoginPage } = useRouter();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: queryKeys.products.summary(Number(id)),
    queryFn: () => getProductSummary(Number(id)),
    enabled: !!id,
  });

  if (error) {
    if (error instanceof UnauthorizedError) {
      showToast.error(API_ERROR_MESSAGE.LOGIN);
      goLoginPage({ redirect: false });
    } else if (
      error instanceof ApiError &&
      error.statusCode >= 400 &&
      error.statusCode < 500
    ) {
      showToast.error(error.message);
      goHomePage();
    } else {
      showToast.error(API_ERROR_MESSAGE.DEFAULT);
    }
  }

  return {
    product,
    isLoading,
    error,
    productId: Number(id),
  };
};
