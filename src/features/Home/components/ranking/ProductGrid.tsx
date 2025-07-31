import {
  Rank_MAP,
  Target_MAP,
  type GridProps,
  type RankedProduct,
} from './RankingTypes';
import styled from '@emotion/styled';
import EmptyMessage from '@components/common/EmptyMessage';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { ProductBasicInfo } from 'src/types/product';
import { RankedProductsOptions } from '@queries/product';

// Product 타입에 ranking을 추가해주는 함수
const addRanking = (products: ProductBasicInfo[]): RankedProduct[] => {
  return products.map((product, i) => ({
    ...product,
    ranking: i + 1,
  }));
};

const ProductGrid = ({
  selectedTarget,
  selectedRank,
  isExpanded,
  toggleExpand,
  onClickItem,
}: GridProps) => {
  // 랭킹 상품 API 요청
  const apiTargetType = Target_MAP[selectedTarget];
  const apiRankType = Rank_MAP[selectedRank];
  const { data } = useSuspenseQuery(
    RankedProductsOptions(apiTargetType, apiRankType)
  );

  // Product 타입에 ranking을 추가
  const products = data ? addRanking(data) : [];

  if (products.length === 0)
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;

  // 더보기 버튼이 클릭되지 않았을 경우 전체 배열중 6개만 이용(1등~6등)
  const visibleItems = isExpanded ? products : products.slice(0, 6);
  return (
    <>
      <Grid>
        {visibleItems.map((item: RankedProduct) => (
          <ProductCard
            key={item.ranking}
            item={item}
            onClickItem={onClickItem}
            role="article"
          />
        ))}
      </Grid>

      {/* 더보기 / 접기 버튼 */}
      <ToggleButton onClick={toggleExpand}>
        {isExpanded ? '접기' : '더보기'}
      </ToggleButton>
    </>
  );
};

export default ProductGrid;

interface CardProps {
  item: RankedProduct;
  onClickItem: (item: RankedProduct) => void;
  role: string;
}
const ProductCard = ({ item, onClickItem, role }: CardProps) => {
  return (
    <Card role={role}>
      <ImageWrapper onClick={() => onClickItem(item)}>
        <ProductImage src={item.imageURL} alt={item.name} />
        <RankBadge>{item.ranking}</RankBadge>
      </ImageWrapper>
      <Brand>{item.brandInfo.name}</Brand>
      <ProductName>{item.name}</ProductName>
      <Price>{item.price.sellingPrice.toLocaleString()} 원</Price>
    </Card>
  );
};

const Grid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing.spacing4,
}));

const Card = styled.div`
  text-align: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const RankBadge = styled.div(({ theme }) => ({
  position: 'absolute',
  top: '6px',
  left: '6px',
  backgroundColor: theme.colors.red.red700,
  color: '#fff',
  padding: '2px 6px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 'bold',
}));

const Brand = styled.p(({ theme }) => ({
  marginTop: theme.spacing.spacing2,
  fontSize: theme.typography.label2Regular.fontSize,
  color: theme.colors.gray.gray600,
}));

const ProductName = styled.p(({ theme }) => ({
  fontWeight: theme.typography.body2Bold.fontWeight,
  fontSize: theme.typography.body2Bold.fontSize,
  margin: 0,
}));

const Price = styled.p(({ theme }) => ({
  marginTop: '4px',
  fontWeight: theme.typography.body2Bold.fontWeight,
  fontSize: theme.typography.body2Bold.fontSize,
}));

const ToggleButton = styled.button(({ theme }) => ({
  display: 'block',
  margin: `${theme.spacing.spacing4} auto 0`,
  marginTop: theme.spacing.spacing4,
  padding: `${theme.spacing.spacing3} ${theme.spacing.spacing10}`,
  border: `1px solid ${theme.colors.gray.gray300}`,
  background: 'white',
  color: theme.colors.gray.gray800,
  borderRadius: '8px',
  fontSize: theme.typography.body2Regular.fontSize,
  cursor: 'pointer',
  fontWeight: 500,
}));
