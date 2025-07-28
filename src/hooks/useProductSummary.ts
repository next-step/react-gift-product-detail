import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchProductSummary } from "../api/product";
import type { ProductSummary } from "../types/product";

export const useProductSummary = (productId: number) => {
  const [product, setProduct] = useState<ProductSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProductSummary(productId)
      .then((data) => {
        setProduct(data);
      })
      .catch((err: unknown) => {
        const errorMessage =
          err instanceof Error ? err.message : "제품 정보를 불러오는데 실패했습니다.";
        setError(errorMessage);

        // 4XX 에러 시 Toast로 에러 메시지 표시하고 홈으로 리다이렉트
        if (err && typeof err === 'object' && 'status' in err && 
            typeof (err as { status: unknown }).status === 'number' &&
            (err as { status: number }).status >= 400 && 
            (err as { status: number }).status < 500) {
          toast.error(errorMessage);
          navigate("/", { replace: true });
        } else {
          toast.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId, navigate]);

  return {
    product,
    loading,
    error,
  };
};
