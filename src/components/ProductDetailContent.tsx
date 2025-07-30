// src/pages/ProductDetailContent.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';

type Announcement = { name: string; value: string; displayOrder: number };
type Detail = { description: string; announcement?: Announcement[] };
type Review = { id: string; authorName: string; content: string };
type WishData = { wishCount: number; isWished: boolean };

export default function ProductDetailContent() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [info, setInfo] = useState<any>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [wishData, setWishData] = useState<WishData>({ wishCount: 0, isWished: false });
  const [tab, setTab] = useState<'desc' | 'rev' | 'info'>('desc');

  useEffect(() => {
    Promise.all([
      axios.get(`/api/products/${productId}`),
      axios.get(`/api/products/${productId}/detail`),
      axios.get(`/api/products/${productId}/highlight-review`),
      axios.get(`/api/products/${productId}/wish`),
    ]).then(([r1, r2, r3, r4]) => {
      setInfo(r1.data.data);
      setDetail(r2.data.data);
      setReviews(r3.data.data.reviews);
      setWishData(r4.data.data);
    }).catch(() => {
      console.error('데이터 로딩 실패');
    });
  }, [productId]);

  if (!info || !detail) {
    return <Loading>로딩 중…</Loading>;
  }

    const announcements: Announcement[] = detail.announcement ?? [];

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
        <Tab active={tab === 'desc'} onClick={() => setTab('desc')}>상품설명</Tab>
        <Tab active={tab === 'rev'} onClick={() => setTab('rev')}>선물후기</Tab>
        <Tab active={tab === 'info'} onClick={() => setTab('info')}>상세정보</Tab>
      </TabWrapper>

      {/* Content */}
      <Content>
        {tab === 'desc' && (
          <DescriptionContainer dangerouslySetInnerHTML={{ __html: detail.description }} />
        )}
        {tab === 'rev' && (
          reviews.map((r: Review) => (
            <ReviewItem key={r.id}>
              <strong>{r.authorName}</strong>: {r.content}
            </ReviewItem>
          ))
        )}
        {tab === 'info' && (
          <InfoList>
            {announcements.length > 0 ? (
              [...announcements].sort((a, b) => a.displayOrder - b.displayOrder)
                .map(item => (
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
        <WishButton
          isWished={wishData.isWished}
          onClick={() => setWishData(prev => ({
            wishCount: prev.isWished ? prev.wishCount - 1 : prev.wishCount + 1,
            isWished: !prev.isWished,
          }))}
        >
          {wishData.isWished ? '❤️' : '🤍'} {wishData.wishCount}
        </WishButton>
        <OrderButton onClick={() => navigate(`/order/${productId}`)}>
          주문하기
        </OrderButton>
      </Footer>
    </Container>
  );
}

// Styled components
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
  font-weight: ${p => (p.active ? 'bold' : 'normal')};
  border-bottom: ${p => (p.active ? '2px solid #000' : '2px solid transparent')};
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
