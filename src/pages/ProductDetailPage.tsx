import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import ProductInfo from '@/components/detail/ProductInfo';
import ProductTabs from '@/components/detail/ProductTabs';
import FooterButton from '@/components/detail/FooterButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.gray[200]};
`;

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  const [activeTab, setActiveTab] = useState<'description' | 'review' | 'detail'>('description');

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(176);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  if (!productId) return <div>유효하지 않은 상품입니다.</div>;

  return (
    <MobileLayout>
      <Wrapper>
        <NavBar />
        <ProductInfo />
        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} productId={productId} />
        <FooterButton liked={liked} likeCount={likeCount} toggleLike={toggleLike} />
      </Wrapper>
    </MobileLayout>
  );
}
