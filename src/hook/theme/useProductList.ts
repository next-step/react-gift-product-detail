
import { type ProductItem} from "@/type/GiftAPI/product";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductQuery } from "./useProductQuery";
import { useProductObserver } from "./useObserver";




function useProductList() {
  const { themeId } = useParams<{ themeId: string }>();
  const [cursor, setCursor] = useState(0);
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [loaderRef, setLoaderRef] = useState<HTMLDivElement | null>(null);
  const [extraLoading, setExtraLoading] = useState(false);
  const { data, error, isLoading } = useProductQuery(themeId, cursor);


  useEffect(() => {
    if (data?.list) {
      setProductList(prev => [...prev, ...data.list]);
      setExtraLoading(false);
    }
  }, [data]);

  const handleIntersect = useCallback(() => {
    setCursor((prev) => prev + 10);
    setExtraLoading(true);
  }, []);

  useProductObserver(loaderRef, handleIntersect);



  return { data, isLoading, error, productList, extraLoading, setLoaderRef }

}

export default useProductList