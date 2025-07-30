import { baseUrl } from "@/constant/api";
import { useAuth } from "@/context/AuthContext";
import { type ProductItem, type ProductItemFromTheme } from "@/type/GiftAPI/product";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFromUrl } from "@/utils/getFromUrl";
import { useQuery } from "@tanstack/react-query";

function useProductList() {
  const { themeId } = useParams<{ themeId: string }>();

  const [cursor, setCursor] = useState(0);
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [loaderRef, setLoaderRef] = useState<HTMLDivElement | null>(null);
  const [extraLoading, setExtraLoading] = useState(false);

  const productsUrl = `${baseUrl}/api/themes/${themeId}/products?cursor=${cursor}`

  const { data, error, isLoading } = useQuery<ProductItemFromTheme>({
    queryKey: ['productListData', productsUrl],
    queryFn: () => getFromUrl(productsUrl),
    placeholderData: (previousData) => previousData,
  },)


  useEffect(() => {
    if (data?.list) {
      setProductList(prev => [...prev, ...data.list]);
      setExtraLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!loaderRef) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCursor(prev => prev + 10);
        setExtraLoading(true);
      }
    },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      });

    observer.observe(loaderRef);

    return () => observer.disconnect();
  }, [loaderRef]);




  return { data, isLoading, error, productList, extraLoading, setLoaderRef }
}

export default useProductList