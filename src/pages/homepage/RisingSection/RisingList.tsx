/** @jsxImportSource @emotion/react */
import type { Product } from "@/types/api_types";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/pages/homepage/hooks/useProducts";
import RisingItem from "@/pages/homepage/RisingSection/RisingItem";

const INITIAL_VISIBLE_COUNT = 6;

export default function RisingList() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const navigate = useNavigate();
  const { data } = useProducts();

  const navigateToOrder = (item: Product & { id: number }) => {
    navigate(`/product/${item.id}`);
  };

  if (!data || data.length === 0) {
    return (
      <Wrapper>
        <EmptyMessage>상품이 없습니다.</EmptyMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Grid>
        {data.slice(0, visibleCount).map((item: Product, index: number) => (
          <CardWrapper key={item.id} onClick={() => navigateToOrder(item)}>
            <RankBadge>{index + 1}</RankBadge>
            <RisingItem product={item} />
          </CardWrapper>
        ))}
      </Grid>
      {visibleCount < data.length && (
        <MoreButton onClick={() => setVisibleCount(data.length)}>
          더보기
        </MoreButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const MoreButton = styled.button`
  margin: 16px auto 0;
  display: block;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray600};
  background: ${({ theme }) => theme.colors.default};
  color: ${({ theme }) => theme.colors.gray1000};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  cursor: pointer;
`;

const EmptyMessage = styled.div`
  text-align: center;
  margin: 40px 0;
  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
`;

const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const RankBadge = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 22px;
  height: 22px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray600};
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;
