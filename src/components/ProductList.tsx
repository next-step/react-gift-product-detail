import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import type { Product } from '@/types/product';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductRanking } from '@/api/product';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 12px;
  list-style: none;
`;

const Item = styled.li`
  background: #fff;
  border-radius: 12px;
  box-shadow: none;
  padding: 12px;
  text-align: center;
  position: relative;
`;

const MoreButton = styled.button`
  margin: 30px auto 20px auto;
  padding: 16px 0;
  width: 60%;
  height: 45px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  color: #222;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
  &:active {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;

const DEFAULT_VISIBLE = 6; // 기본으로 보여줄 상품 개수

interface ProductListProps {
  products?: Product[];
  showRank?: boolean;
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return '#FF3B30'; // 1등: 빨강
    case 2:
      return '#FF9500'; // 2등: 주황
    case 3:
      return '#FF2D55'; // 3등: 분홍
    default:
      return '#C4C4C4'; // 그 외: 회색
  }
};

const RankBadge = styled.div<{ rank: number }>`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  color: white;
  font-weight: 830;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ rank }) => getRankColor(rank)};
  z-index: 2;
`;

function ProductList({
  products: propProducts,
  showRank = true,
}: ProductListProps) {
  // 더보기/접기 state
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE);

  // products prop이 전달되면 API 호출하지 않음
  const { data } = propProducts
    ? { data: undefined }
    : useSuspenseQuery<Product[], Error>({
        queryKey: ['products', 'ranking'],
        queryFn: fetchProductRanking,
      });

  const products: Product[] = propProducts || (Array.isArray(data) ? data : []);
  const visibleProducts: Product[] = products.slice(0, visibleCount);
  const isAllVisible = visibleCount >= products.length;

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleItemClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (visibleProducts.length === 0) return <div>상품 목록이 없습니다.</div>;

  return (
    <>
      <List>
        {visibleProducts.map((p, idx) => (
          <Item
            key={p.id}
            onClick={() => handleItemClick(p.id)}
            style={{ cursor: 'pointer' }}
          >
            {showRank && <RankBadge rank={idx + 1}>{idx + 1}</RankBadge>}
            <img
              src={p.imageURL}
              alt={p.name}
              style={{ width: '100%', borderRadius: 8 }}
            />
            <div style={{ color: '#888', fontSize: 14, marginTop: 8 }}>
              {p.brandInfo.name}
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginTop: 4 }}>
              {p.name}
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginTop: 4 }}>
              {p.price.sellingPrice.toLocaleString()} 원
            </div>
          </Item>
        ))}
      </List>
      {products.length > DEFAULT_VISIBLE && (
        <>
          {!isAllVisible ? (
            <MoreButton onClick={() => setVisibleCount(products.length)}>
              더보기
            </MoreButton>
          ) : (
            <MoreButton onClick={() => setVisibleCount(DEFAULT_VISIBLE)}>
              접기
            </MoreButton>
          )}
        </>
      )}
    </>
  );
}

export default ProductList;
