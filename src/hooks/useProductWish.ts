import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchProductWish } from "@/api/product";
import type { ProductWish } from "@/types/product";

export const useProductWish = (productId: number) => {
  const queryClient = useQueryClient();

  const { data: wish } = useSuspenseQuery<ProductWish>({
    queryKey: ["productWish", productId],
    queryFn: () => fetchProductWish(productId),
  });

  const mutation = useMutation({
    mutationFn: async (nextWished: boolean) => {
      return nextWished;
    },
    onMutate: async (nextWished: boolean) => {
      await queryClient.cancelQueries({ queryKey: ["productWish", productId] });

      const previous = queryClient.getQueryData<ProductWish>([
        "productWish",
        productId,
      ]);

      queryClient.setQueryData<ProductWish>(
        ["productWish", productId],
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            isWished: nextWished,
            wishCount: prev.wishCount + (nextWished ? 1 : -1),
          };
        },
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["productWish", productId], context.previous);
      }
    },
    onSettled: () => {},
  });

  const toggleWish = () => {
    if (!wish) return;
    mutation.mutate(!wish.isWished);
  };

  return {
    wish,
    toggleWish,
    isLoading: mutation.isPending,
  };
};
