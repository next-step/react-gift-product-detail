import { api } from "@/app/lib/api";

import type { RankTypeQuery } from "@/entities/gift/constants/rankType";
import type { TargetGroupQuery } from "@/entities/gift/constants/targetType";
import { GIFT_QUERY_KEYS } from "@/entities/gift/services/_keys";

import { useQueryParamState } from "@/shared/hooks/useQueryParamState";

import { useQuery } from "@tanstack/react-query";

export type GetRankingGiftsResponseBody = Array<{
    id: number;
    name: string;
    price: {
        basicPrice: number;
        sellingPrice: number;
        discountRate: number;
    };
    imageURL: string;
    brandInfo: {
        id: number;
        name: string;
        imageURL: string;
    };
}>;

export const getRankingGifts = async (targetType: TargetGroupQuery, rankType: RankTypeQuery) => {
    const { data: response } = await api.get<BaseResponse<GetRankingGiftsResponseBody>>(
        "/products/ranking",
        { params: { targetType, rankType } },
    );
    return response.data;
};

export const useRankingGifts = () => {
    const [targetType] = useQueryParamState<TargetGroupQuery>("targetType", "ALL");
    const [rankType] = useQueryParamState<RankTypeQuery>("rankType", "MANY_WISH");

    const { isPending, data, error, refetch } = useQuery({
        queryKey: GIFT_QUERY_KEYS.RANKING_GIFT_BY_QUERY(
            targetType || "ALL",
            rankType || "MANY_WISH",
        ),
        queryFn: () => getRankingGifts(targetType || "ALL", rankType || "MANY_WISH"),
        enabled: Boolean(targetType && rankType),
    });

    return {
        isPending,
        data: data || null,
        error,
        request: refetch,
    };
};
