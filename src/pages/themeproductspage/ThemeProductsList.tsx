import styled from "@emotion/styled";
import { useParams, useNavigate } from "react-router-dom";
import { useSuspenseApiQuery } from "@/hooks/useSuspenseApiQuery";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import type { Product } from "@/types/api_types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useEffect, useRef, useState, useCallback } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

type ThemeProductResponse = {
  list: Product[];
  cursor?: string | null;
  hasMoreList?: boolean;
};

export default function ThemeProductsList() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const handleApiError = useApiErrorHandler({
    fallbackMessage: "상품 정보를 불러오는데 실패했어요.",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: initialData } = useSuspenseApiQuery<ThemeProductResponse>({
    url: `/api/themes/${themeId}/products`,
    queryKey: ["theme-products", themeId, "initial"],
  });

  const { data, isLoading, isError, error, refetch } =
    useApiQuery<ThemeProductResponse>({
      url: `/api/themes/${themeId}/products${cursor ? `?cursor=${cursor}` : ""}`,
      queryKey: ["theme-products", themeId, cursor],
      enabled: false,
    });

  useEffect(() => {
    if (initialData) {
      setProducts(initialData.list);
      setCursor(initialData.cursor ?? null);
      setHasMore(
        initialData.hasMoreList !== false && !!initialData.list.length
      );
      setInitLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    if (isError && error) {
      if ((error as any)?.response?.status === 404) {
        handleApiError(error);
      } else {
        throw error;
      }
    }
  }, [isError, error, handleApiError]);

  useEffect(() => {
    if (data && cursor) {
      setProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filtered = data.list.filter((item) => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });
      setCursor(data.cursor ?? null);
      setHasMore(data.hasMoreList !== false && !!data.list.length);
    }
  }, [data]);

  const handleObserver = useCallback(() => {
    if (hasMore && !isLoading && !initLoading && products.length > 0) {
      refetch();
    }
  }, [hasMore, isLoading, initLoading, products.length, refetch]);

  useInfiniteScroll({
    targetRef: observerRef,
    onIntersect: handleObserver,
    enabled: hasMore && !isLoading && !initLoading && products.length > 0,
    threshold: 0.4,
  });

  const handleItemClick = (id: number) => {
    navigate(`/order/${id}`);
  };

  if (initLoading) return <LoadingSpinner />;
  if (products.length === 0)
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;

  return (
    <>
      <List>
        {products.map((product) => (
          <Card key={product.id} onClick={() => handleItemClick(product.id)}>
            <Image src={product.imageURL} alt={product.name} />
            <Name>{product.name}</Name>
            <Brand>{product.brandInfo.name}</Brand>
            <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
          </Card>
        ))}
      </List>
      <ObserverTarget ref={observerRef} />
      {isLoading && <LoadingSpinner />}
    </>
  );
}

const EmptyMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin-top: 50px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
`;

const Card = styled.div`
  overflow: hidden;
  text-align: center;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 30px;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin: 8px 0;
`;

const Brand = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin: 8px 0;
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  font-weight: bold;
  margin: 8px 0;
`;

const ObserverTarget = styled.div`
  height: 100px;
  margin-top: 32px;
`;
