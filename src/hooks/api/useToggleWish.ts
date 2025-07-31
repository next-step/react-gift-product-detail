import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseToggleWishParams = {
  productId: number;
};

const useToggleWish = ({ productId }: UseToggleWishParams) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (isWished: boolean) => {
      return Promise.resolve({
        isWished: !isWished,
      });
    },
    onMutate: async isWished => {
      await queryClient.cancelQueries({
        queryKey: ["productsWish", productId],
      });

      const previous = queryClient.getQueryData<{
        isWished: boolean;
        wishCount: number;
      }>(["productsWish", productId]);

      queryClient.setQueryData(["productsWish", productId], {
        isWished: !isWished,
        wishCount: (previous?.wishCount ?? 0) + (isWished ? -1 : 1),
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["productsWish", productId], context.previous);
      }
    },
    onSettled: () => {
      // 실제 api를 요청하는 경우에는 invalidateQueries를 사용하여 api 데이터를 새로고침
      // queryClient.invalidateQueries({
      //   queryKey: ["productsWish", productId],
      // });
    },
  });

  return { toggle: mutate, isPending };
};

export default useToggleWish;
