import { isAxiosError } from "axios";

import { PRODUCT_QUERY_KEYS } from "@/features/product/services/_keys";
import type { GetProductWishByProductId } from "@/features/product/services/getProductWishByProductId";

import { HTTPExceptionAdapter } from "@/shared/errors/HTTPExceptionAdapter";

import { useQueryClient, useMutation } from "@tanstack/react-query";

export async function addProductToWish(productId: number) {
    try {
        await new Promise((resolve) => resolve(productId));
    } catch (error) {
        if (!isAxiosError(error)) throw error;
        throw HTTPExceptionAdapter.fromAxiosError(error);
    }
}

export const useToggleProductWish = (productId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => addProductToWish(productId),

        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: PRODUCT_QUERY_KEYS.PRODUCT_WISH_BY_ID(productId),
            });

            const previousWishData = queryClient.getQueryData<GetProductWishByProductId>(
                PRODUCT_QUERY_KEYS.PRODUCT_WISH_BY_ID(productId),
            );

            if (previousWishData) {
                queryClient.setQueryData<GetProductWishByProductId>(
                    PRODUCT_QUERY_KEYS.PRODUCT_WISH_BY_ID(productId),
                    {
                        isWished: !previousWishData.isWished,
                        wishCount: previousWishData.isWished
                            ? previousWishData.wishCount - 1
                            : previousWishData.wishCount + 1,
                    },
                );
            }

            return { previousWishData };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousWishData) {
                queryClient.setQueryData(
                    PRODUCT_QUERY_KEYS.PRODUCT_WISH_BY_ID(productId),
                    context.previousWishData,
                );
            }
        },

        onSettled: () => {
            // TODO: 테스트용
            // queryClient.invalidateQueries({
            //     queryKey: PRODUCT_QUERY_KEYS.PRODUCT_WISH_BY_ID(productId),
            // });
        },
    });
};
