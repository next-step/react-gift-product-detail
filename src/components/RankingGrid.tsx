import styled from '@emotion/styled';
import { useState } from 'react';
import type { Product } from '@/types/Product';
import useGiftRanking from '@/hooks/useGiftRanking';
import RankingItem from './RankingItem';

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing6} ${({ theme }) => theme.spacing.spacing2};
`;

const MoreBtn = styled.button`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.spacing8};
  margin-bottom: ${({ theme }) => theme.spacing.spacing10};
  padding: ${({ theme }) => theme.spacing.spacing3};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 4px;
  background: #fff;
  ${({ theme }) => theme.typography.body2Regular};
  cursor: pointer;
`;

interface RankingGridProps {
  gender: string;
  type: string;
}

export default function RankingGrid({ gender, type }: RankingGridProps) {
  const { data: products = [] } = useGiftRanking(gender, type);
  const [collapsed, setCollapsed] = useState(true);

  const visible: Product[] = collapsed ? products.slice(0, 6) : products;

  if (products.length === 0) {
    return <p>상품 목록이 없습니다.</p>;
  }

  return (
    <>
      <Grid>
        {visible.map((item, index) => (
          <RankingItem key={item.id} item={item} rank={index + 1} />
        ))}
      </Grid>
      <MoreBtn onClick={() => setCollapsed((c) => !c)}>{collapsed ? '더보기' : '접기'}</MoreBtn>
    </>
  );
}
