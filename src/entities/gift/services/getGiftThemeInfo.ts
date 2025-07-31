import { api } from "@/app/lib/api";

import { GIFT_QUERY_KEYS } from "@/entities/gift/services/_keys";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetThemeInfoResponseBody {
    themeId: number;
    name: string;
    title: string;
    description: string;
    backgroundColor: string;
}

export async function getGiftThemeInfo(themeId?: number) {
    const { data: response } = await api<BaseResponse<GetThemeInfoResponseBody>>(
        `/themes/${themeId}/info`,
    );
    return response.data;
}

export const useGetGiftThemeInfo = (themeId: number) => {
    const { data, error, refetch } = useSuspenseQuery({
        queryKey: GIFT_QUERY_KEYS.GIFT_THEME_INFO(themeId),
        queryFn: () => getGiftThemeInfo(themeId),
    });

    return {
        data,
        error,
        request: refetch,
    };
};
