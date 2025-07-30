import styled from '@emotion/styled';
import { useState } from 'react';
import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.gray[200]};
`;

const Content = styled.div`
  margin-bottom: 8px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 483px;
`;

const ProductInfo = styled.section`
  background: #fff;
  padding: 20px 16px 16px;
`;

const ProductTitle = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
`;

const Brand = styled.p`
  padding: 16px;
  display: flex;
  align-items: center;
  background: #fff;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const BrandImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #000;
  margin-right: 8px;
`;

const BrandName = styled.span`
  ${({ theme }) => theme.typography.subtitle1Regular};
`;

const Tabs = styled.div`
  display: flex;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px 20px;
  text-align: center;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? '#000' : 'transparent')};
  color: ${({ theme, active }) => (active ? '#000' : theme.colors.gray[600])};
  ${({ theme }) => theme.typography.body1Regular};
  cursor: pointer;
`;

const TabContent = styled.div`
  background: #fff;
  padding: 16px;
`;

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  background: #fff;
  position: sticky;
  bottom: 0;
  height: 50px;
`;

const LikeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const LikeCount = styled.span`
  ${({ theme }) => theme.typography.label2Regular}
`;

const OrderButton = styled.button`
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: #000;
  border: none;
  ${({ theme }) => theme.typography.body1Bold};
  height: 100%;
  width: 100%;
  cursor: pointer;
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

        <Content>
          <ProductImg />

          <ProductInfo>
            <ProductTitle>부드러운 고구마 라떼 케이크</ProductTitle>
            <ProductPrice>26350원</ProductPrice>
          </ProductInfo>
          <Brand>
            <BrandImg />
            <BrandName>뚜레쥬르</BrandName>
          </Brand>
        </Content>

        <Tabs>
          <Tab active={activeTab === 'description'} onClick={() => setActiveTab('description')}>
            상품설명
          </Tab>
          <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
            선물후기
          </Tab>
          <Tab active={activeTab === 'detail'} onClick={() => setActiveTab('detail')}>
            상세정보
          </Tab>
        </Tabs>

        <TabContent>
          {activeTab === 'description' && <div>상품설명 콘텐츠 영역</div>}
          {activeTab === 'review' && <div>선물후기 콘텐츠 영역</div>}
          {activeTab === 'detail' && <div>상세정보 콘텐츠 영역</div>}
        </TabContent>

        <FooterWrapper>
          <LikeSection>
            <LikeButton onClick={toggleLike}>
              {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            </LikeButton>
            <LikeCount>{likeCount}</LikeCount>
          </LikeSection>
          <OrderButton>주문하기</OrderButton>
        </FooterWrapper>
      </Wrapper>
    </MobileLayout>
  );
}
