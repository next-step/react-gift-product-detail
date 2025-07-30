import styled from '@emotion/styled';
import { useState } from 'react';

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
  const [activeTab, setActiveTab] = useState<'description' | 'review' | 'detail'>('description');

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(176);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <MobileLayout>
      <Wrapper>
        <NavBar />
        <ProductInfo />
        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <FooterButton liked={liked} likeCount={likeCount} toggleLike={toggleLike} />
      </Wrapper>
    </MobileLayout>
  );
}
