import { api } from "@/app/lib/api";

import { GIFT_QUERY_KEYS } from "@/entities/gift/services/_keys";

import { useSuspenseQuery } from "@tanstack/react-query";

export type GetThemesResponseBody = Array<{
    themeId: number;
    name: string;
    image: string;
}>;

export async function getGiftThemes() {
    const { data: response } = await api.get<BaseResponse<GetThemesResponseBody>>("/themes");
    return response.data;
}

export const useGiftThemes = () => {
    const { data, error, refetch } = useSuspenseQuery({
        queryKey: GIFT_QUERY_KEYS.GIFT_THEMES(),
        queryFn: getGiftThemes,
    });

    return {
        data,
        error,
        request: refetch,
    };
};
