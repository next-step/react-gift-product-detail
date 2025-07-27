import { useCallback, useMemo } from "react";

import { useInView } from "@/shared/hooks/useInView";
import { type CursorPaginateApiFunction } from "@/shared/utils/cursorGenerator";

import { useInfiniteQuery } from "@tanstack/react-query";

export const USE_INFINITE_SCROLL_DEFAULT_OPTIONS = {
    LIMIT: 10,
    ENABLED: true,
    THRESHOLD: 0.1,
    ROOT_MARGIN: "100px",
};

export interface UseInfiniteScrollOptions<T, K extends string> {
    apiFunction: CursorPaginateApiFunction<T, K>;
    limit?: number;
    enabled?: boolean;
    threshold?: number;
    rootMargin?: string;
    queryKey: string[];
}

export function useInfiniteScroll<T, K extends string>({
    apiFunction,
    limit = USE_INFINITE_SCROLL_DEFAULT_OPTIONS.LIMIT,
    enabled = USE_INFINITE_SCROLL_DEFAULT_OPTIONS.ENABLED,
    threshold = USE_INFINITE_SCROLL_DEFAULT_OPTIONS.THRESHOLD,
    rootMargin = USE_INFINITE_SCROLL_DEFAULT_OPTIONS.ROOT_MARGIN,
    queryKey,
}: UseInfiniteScrollOptions<T, K>) {
    const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey,
            queryFn: async ({ pageParam = 0 }) => {
                const result = await apiFunction(pageParam as number, limit);
                return result.data;
            },
            initialPageParam: 0,
            getNextPageParam: (lastPage) => {
                if (!lastPage.hasMoreList) return undefined;
                return lastPage.cursor;
            },
            enabled,
        });

    const items = useMemo(() => {
        if (!data) return [];

        return data.pages.flatMap((page) => {
            const listKey = Object.keys(page).find(
                (key) =>
                    key !== "hasMoreList" &&
                    key !== "cursor" &&
                    Array.isArray(page[key as keyof typeof page]),
            ) as K;

            return listKey ? (page[listKey] as T[]) : [];
        });
    }, [data]);

    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const { ref: loadMoreRef } = useInView({
        onInView: loadMore,
        threshold,
        rootMargin,
    });

    const reset = useCallback(() => {
        refetch();
    }, [refetch]);

    return {
        items,
        isPending: isPending || isFetchingNextPage,
        error,
        hasMore: hasNextPage,
        loadMore,
        loadMoreRef,
        reset,
    };
}
