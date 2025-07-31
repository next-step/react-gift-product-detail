import type { RankingProduct } from '@/entities/product/model/types';
import { RankingItemCard } from '@/entities/product/ui';
import * as S from './styles';

interface RankingGridProps {
  data: RankingProduct[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  onItemClick: (productId: number) => void;
}

const RankingGrid = ({ data, isExpanded, onToggleExpand, onItemClick }: RankingGridProps) => {
  return (
    <>
      <S.Grid>
        {(isExpanded ? data : data.slice(0, 6)).map((item, index) => (
          <RankingItemCard
            key={item.id}
            imageUrl={item.imageURL}
            title={item.name}
            subtitle={item.brandInfo.name}
            price={item.price.sellingPrice}
            rank={index + 1}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </S.Grid>

      <S.MoreButton onClick={onToggleExpand}>{isExpanded ? '접기' : '더보기'}</S.MoreButton>
    </>
  );
};

export default RankingGrid;
