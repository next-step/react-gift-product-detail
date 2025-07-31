// src/pages/ProductDetailContent.tsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import styled from '@emotion/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type Announcement = { name: string; value: string; displayOrder: number };
type Detail = { description: string; announcement?: Announcement[] };
type Review = { id: string; authorName: string; content: string };
type WishData = { wishCount: number; isWished: boolean };
type Info = { imageURL: string; name: string; price: { sellingPrice: number } };

export default function ProductDetailContent() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<'desc' | 'rev' | 'info'>('desc');

  if (!productId) {
    return <Loading>잘못된 접근입니다.</Loading>;
  }

  // 1) 상품 기본 정보
  const {
    data: info,
    isLoading: infoLoading,
    error: infoError,
  } = useQuery<Info, AxiosError>({
    queryKey: ['product', productId],
    queryFn: () =>
      axios.get<{ data: Info }>(`/api/products/${productId}`).then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  });

  // 2) 상세 정보
  const {
    data: detail,
    isLoading: detailLoading,
    error: detailError,
  } = useQuery<Detail, AxiosError>({
    queryKey: ['product', productId, 'detail'],
    queryFn: () =>
      axios.get<{ data: Detail }>(`/api/products/${productId}/detail`).then((res) => res.data.data),
  });

  // 3) 리뷰
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery<Review[], AxiosError>({
    queryKey: ['product', productId, 'reviews'],
    queryFn: () =>
      axios
        .get<{ data: { reviews: Review[] } }>(`/api/products/${productId}/highlight-review`)
        .then((res) => res.data.data.reviews),
  });

  // 4) 찜 데이터
  const {
    data: wishData = { wishCount: 0, isWished: false },
    isLoading: wishLoading,
    error: wishError,
  } = useQuery<WishData, AxiosError>({
    queryKey: ['product', productId, 'wish'],
    queryFn: () =>
      axios.get<{ data: WishData }>(`/api/products/${productId}/wish`).then((res) => res.data.data),
  });

  // 클릭 시 로컬 캐시만 업데이트 (낙관적)
  const handleToggleWish = () => {
    queryClient.setQueryData<WishData>(['product', productId, 'wish'], (old) => {
      if (!old) return { wishCount: 0, isWished: false };
      return {
        wishCount: old.isWished ? old.wishCount - 1 : old.wishCount + 1,
        isWished: !old.isWished,
      };
    });
  };

  const isLoading = infoLoading || detailLoading || reviewsLoading || wishLoading;
  const isError = !!(infoError || detailError || reviewsError || wishError);

  if (isLoading) return <Loading>로딩 중…</Loading>;
  if (isError || !info || !detail) return <Loading>데이터 로딩 중 오류가 발생했습니다.</Loading>;

  const announcements = detail.announcement ?? [];
  const sortedAnnouncements = [...announcements].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <Container>
      {/* Header */}
      <Header>
        <ProductImage src={info.imageURL} alt={info.name} />
        <Title>{info.name}</Title>
        <Price>{info.price.sellingPrice.toLocaleString()}원</Price>
      </Header>

      {/* Tabs */}
      <TabWrapper>
        <Tab active={tab === 'desc'} onClick={() => setTab('desc')}>
          상품설명
        </Tab>
        <Tab active={tab === 'rev'} onClick={() => setTab('rev')}>
          선물후기
        </Tab>
        <Tab active={tab === 'info'} onClick={() => setTab('info')}>
          상세정보
        </Tab>
      </TabWrapper>

      {/* Content */}
      <Content>
        {tab === 'desc' && (
          <DescriptionContainer dangerouslySetInnerHTML={{ __html: detail.description }} />
        )}
        {tab === 'rev' &&
          reviews.map((r) => (
            <ReviewItem key={r.id}>
              <strong>{r.authorName}</strong>: {r.content}
            </ReviewItem>
          ))}
        {tab === 'info' && (
          <InfoList>
            {sortedAnnouncements.length > 0 ? (
              sortedAnnouncements.map((item) => (
                <InfoItem key={item.displayOrder}>
                  <InfoName>{item.name}</InfoName>
                  <InfoValue>{item.value}</InfoValue>
                </InfoItem>
              ))
            ) : (
              <EmptyInfo>등록된 상세 정보가 없습니다.</EmptyInfo>
            )}
          </InfoList>
        )}
      </Content>

      {/* Footer */}
      <Footer>
        <WishButton isWished={wishData.isWished} onClick={handleToggleWish} disabled={wishLoading}>
          {wishData.isWished ? '❤️' : '🤍'} {wishData.wishCount}
        </WishButton>
        <OrderButton onClick={() => navigate(`/order/${productId}`)}>주문하기</OrderButton>
      </Footer>
    </Container>
  );
}

// --- Styled components ---
const Loading = styled.div`
  padding: 2rem;
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  text-align: center;
  padding: 1rem;
`;
const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
const Title = styled.h1`
  margin: 1rem 0 0.5rem;
  font-size: 1.5rem;
`;
const Price = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
`;
const TabWrapper = styled.nav`
  display: flex;
  border-bottom: 1px solid #ddd;
`;
const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: none;
  font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
  border-bottom: ${(p) => (p.active ? '2px solid #000' : '2px solid transparent')};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
const Content = styled.div`
  padding: 1rem;
`;
const DescriptionContainer = styled.div`
  line-height: 1.6;
  img {
    max-width: 100%;
    height: auto;
  }
`;
const ReviewItem = styled.div`
  margin-bottom: 1rem;
`;
const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;
const InfoItem = styled.li`
  margin-bottom: 1rem;
`;
const InfoName = styled.div`
  font-weight: bold;
`;
const InfoValue = styled.div`
  color: #555;
`;
const EmptyInfo = styled.div`
  color: #999;
`;
const Footer = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
`;
const WishButton = styled.button<{ isWished: boolean }>`
  flex: 1;
  padding: 1rem;
  background: #fff;
  border: none;
  cursor: pointer;
`;
const OrderButton = styled.button`
  flex: 2;
  padding: 1rem;
  background: #ffd400;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;
