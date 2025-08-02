import type { ProductItem } from "@/type/GiftAPI/product";
import { getFromUrl } from "@/utils/getFromUrl";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

const GIFTLENGTH = 6;

function useGiftRankingListData(RankingUrl : string){
    const [isExpanded, setIsExpanded] = useState(false);
    const { data } = useSuspenseQuery<[]>({
        queryKey: ['rankingData', RankingUrl],
        queryFn: () => getFromUrl(RankingUrl),
    });

    const visibleCount = isExpanded ? data?.length : GIFTLENGTH;
    const shownProducts = data ? (data as ProductItem[]).slice(0, visibleCount) : [];
    const ListLength = data.length

    return ({
        ListLength,
        isExpanded,
        shownProducts,
        setIsExpanded
    })
}

export default useGiftRankingListData
