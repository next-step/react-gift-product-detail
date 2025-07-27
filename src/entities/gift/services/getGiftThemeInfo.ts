import { useNavigate } from "react-router-dom";

import { isAxiosError } from "axios";

import { api } from "@/app/lib/api";

import { GIFT_QUERY_KEYS } from "@/entities/gift/services/_keys";

import { useQuery } from "@tanstack/react-query";

export interface GetTHemeInfoResponseBody {
    themeId: number;
    name: string;
    title: string;
    description: string;
    backgroundColor: string;
}

export async function getGiftThemeInfo(themeId?: number) {
    const { data: response } = await api<BaseResponse<GetTHemeInfoResponseBody>>(
        `/themes/${themeId}/info`,
    );
    return response.data;
}

export const useGetGiftThemeInfo = (themeId: number) => {
    const navigate = useNavigate();

    const { isPending, data, error, refetch } = useQuery({
        queryKey: GIFT_QUERY_KEYS.GIFT_THEME_INFO(themeId),
        queryFn: () => getGiftThemeInfo(themeId),
        enabled: Boolean(themeId),
        retry: (failureCount, error) => {
            if (isAxiosError(error) && error.response?.status === 404) {
                navigate("/");
                return false;
            }
            return failureCount < 3;
        },
    });

    return {
        isPending,
        data: data || null,
        error,
        request: refetch,
    };
};
