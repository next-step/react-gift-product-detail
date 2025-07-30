// src/pages/productDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';

type Props = { productId: string };
type Detail = {
  description: string;
  announcement: { name: string; value: string; displayOrder: number }[];
};
type Review = { id: string; authorName: string; content: string };
type WishData = { wishCount: number; isWished: boolean };

export default function ProductDetailPage({ productId }: Props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState<any>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [wishData, setWishData] = useState<WishData>({ wishCount: 0, isWished: false });
  const [tab, setTab] = useState<'desc' | 'rev' | 'info'>('desc');

  useEffect(() => {
    axios.get(`/api/products/${productId}`).then(res => setInfo(res.data.data));
    axios.get(`/api/products/${productId}/detail`).then(res => setDetail(res.data.data));
    axios.get(`/api/products/${productId}/highlight-review`).then(res => setReviews(res.data.data.reviews));
    axios.get(`/api/products/${productId}/wish`).then(res => setWishData(res.data.data));
  }, [productId]);

  if (!info || !detail) {
    return <Loading>로딩 중…</Loading>;
  }

  return (
    <Container>
      {/* Header: 이미지, 이름, 가격 */}
      <Header>
        <ProductImage src={info.imageURL} alt={info.name} />
        <Title>{info.name}</Title>
        <Price>{info.price.sellingPrice.toLocaleString()}원</Price>
      </Header>

      {/* Tabs */}
      <TabWrapper>
        <TabButton type="button" active={tab === 'desc'} onClick={() => setTab('desc')}>상품설명</TabButton>
        <TabButton type="button" active={tab === 'rev'} onClick={() => setTab('rev')}>선물후기</TabButton>
        <TabButton type="button" active={tab === 'info'} onClick={() => setTab('info')}>상세정보</TabButton>
      </TabWrapper>

      {/* Content */}
      <Content>
        {tab === 'desc' && (
          <DescriptionContainer
            dangerouslySetInnerHTML={{ __html: detail.description }}
          />
        )}
        {tab === 'rev' && (
          reviews.map(r => (
            <ReviewItem key={r.id}>
              <strong>{r.authorName}</strong>: {r.content}
            </ReviewItem>
          ))
        )}
        {tab === 'info' && (
          <InfoList>
            {detail.announcement && detail.announcement.length > 0 ? (
              [...detail.announcement]
                .sort((a, b) => a.displayOrder - b.displayOrder)
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

      {/* Footer: 찜, 주문 */}
      <Footer>
        <WishButton onClick={() => {/* 낙관적 업데이트 로직 */}}>
          {wishData.isWished ? '❤️' : '🤍'} {wishData.wishCount}
        </WishButton>
        <OrderButton onClick={() => navigate(`/order/${productId}`)}>
          주문하기
        </OrderButton>
      </Footer>
    </Container>
  );
}

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

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: none;
  font-weight: ${p => p.active ? 'bold' : 'normal'};
  border-bottom: ${p => p.active ? '2px solid #000' : '2px solid transparent'};
  cursor: pointer;
`;

const Content = styled.div`
  padding: 1rem;
`;

const DescriptionContainer = styled.div`
  line-height: 1.6;
  img { max-width: 100%; height: auto; }
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
  margin-bottom: 0.25rem;
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

const WishButton = styled.button`
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
