import { useState, useCallback, useEffect } from "react";
import type { Product, ThemeProductResponse } from "@/types/api_types";

export const useThemeData = (initialData?: ThemeProductResponse) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [moreAvailable, setMoreAvailable] = useState(true);

  useEffect(() => {
    if (initialData) {
      setProducts(initialData.list);
      setCursor(initialData.cursor ?? null);
      setMoreAvailable(initialData.hasMoreList !== false && !!initialData.list.length);
    }
  }, [initialData]);

  const append = useCallback(
    (newProducts: Product[], newCursor: number | null, hasMore: boolean) => {
      setProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filtered = newProducts.filter((item) => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });
      setCursor(newCursor);
      setMoreAvailable(hasMore && !!newProducts.length);
    },
    []
  );

  return {
    products,
    cursor,
    moreAvailable,
    append,
    setProducts, // 초기화 등을 위해 노출
  };
};
