export const defaultQueryOptions = {
  queries: {
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
    suspense: true,
    useErrorBoundary: true,
  },
};
