import {
    LoadMoreButton,
    LoadMoreButtonDiv,
} from './GiftRanking.styled';
import type { RankType, TargetType } from '@/type/giftRanking';
import { CentorAlignDiv240, Gap } from '@/styles/CommomStyle/Common.styled';
import {  ProductGrid,} from '@/styles/CommomStyle/ProductList';
import { baseRankingUrl } from '@/constant/api';
import ProductCard from '../ProductCard';
import useGiftRankingListData from '@/hook/main/useGiftRankingListData';





interface GiftRankingListProps {
    targetType: TargetType;
    rankType: RankType;
}

const GIFTLENGTH = 6;

const GiftRankingList = ({ targetType, rankType }: GiftRankingListProps) => {
    const RankingUrl = `${baseRankingUrl}?targetType=${targetType}&rankType=${rankType}`
    const {ListLength, isExpanded, shownProducts, setIsExpanded,} = useGiftRankingListData(RankingUrl);
    if (ListLength === 0) return (
        <CentorAlignDiv240>
            <p>상품이 없습니다</p>
        </CentorAlignDiv240>
    )

    return (
        <>
            <ProductGrid>
                {shownProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </ProductGrid>
            <Gap height={16} />
            <LoadMoreButtonDiv>
                {ListLength !== undefined && ListLength > GIFTLENGTH && (
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