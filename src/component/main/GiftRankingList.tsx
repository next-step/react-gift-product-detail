import { useState } from 'react';
import {
    LoadMoreButton,
    LoadMoreButtonDiv,
} from './GiftRanking.styled';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { ProductItem } from '@/type/GiftAPI/product';
import type { RankType, TargetType } from '@/type/giftRanking';
import { CentorAlignDiv240, Gap } from '@/styles/CommomStyle/Common.styled';
import {  ProductGrid,} from '@/styles/CommomStyle/ProductList';
import Loading from '../Loading';
import { baseRankingUrl } from '@/constant/api';
import { getFromUrl } from '@/utils/getFromUrl';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../ProductCard';




interface GiftRankingListProps {
    targetType: TargetType;
    rankType: RankType;
}

const GIFTLENGTH = 6;


const GiftRankingList = ({ targetType, rankType }: GiftRankingListProps) => {
    const RankingUrl = `${baseRankingUrl}?targetType=${targetType}&rankType=${rankType}`
    const [isExpanded, setIsExpanded] = useState(false);
    const { data, error, isLoading } = useQuery<[]>({
        queryKey: ['rankingData', RankingUrl],
        queryFn: () => getFromUrl(RankingUrl)
    });

    const visibleCount = isExpanded ? data?.length : GIFTLENGTH;
    const shownProducts = data ? (data as ProductItem[]).slice(0, visibleCount) : [];

    if (error) return null

    if (data === null || isLoading) return (
        <Loading />
    )
    if (data?.length === 0) return (
        <CentorAlignDiv240>
            <p>상품이 없습니다</p>
        </CentorAlignDiv240>
    )

    return (
        <>
            <ProductGrid>
                {shownProducts.map((product) => (
                    <ProductCard {...product} />
                ))}
            </ProductGrid>
            <Gap height={16} />
            <LoadMoreButtonDiv>
                {data?.length !== undefined && data?.length > GIFTLENGTH && (
                    <LoadMoreButton onClick={() => setIsExpanded((prev) => !prev)}>
                        <p>
                            {isExpanded ? '접기' : '더보기'}
                        </p>
                    </LoadMoreButton>
                )}
            </LoadMoreButtonDiv>

            <Gap height={16} />
        </>
    )
};
export default GiftRankingList;