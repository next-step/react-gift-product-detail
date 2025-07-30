import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/common/Header';
import styled from '@emotion/styled';
import MainContent from '../components/product/MainContent';
import ProductTabs from '../components/product/ProductTabs';
import { useProductWish } from '../hooks/useProductWish';
import { useEffect, useState } from 'react';

const PageContainer = styled.div`
  padding-bottom: 40px;
`;

const BottomActionBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 720px;
  display: flex;
  align-items: center;
  background-color: white;
`;

const WishSection = styled.div`
  width: 64px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const HeartIcon = ({ isWished }: { isWished: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={isWished ? '#fa342c' : 'none'}
    stroke={isWished ? '#fa342c' : '#2a3038'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-heart"
    aria-hidden="true"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const BottomOrderButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  max-width: 720px;
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  text-align: center;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textDefault};

  cursor: pointer;
`;

const ProductDetailInfoPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const id = Number(productId);
  const { data } = useProductWish(id);
  const initialWishCount = data?.wishCount;

  const [isWished, setIsWished] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    if (initialWishCount !== undefined) {
      setWishCount(initialWishCount);
    }
  }, [initialWishCount]);

  const onClickWish = () => {
    if (isWished) {
      setWishCount(prev => Math.max(0, (prev ?? 0) - 1));
    } else {
      setWishCount(prev => (prev ?? 0) + 1);
    }
    setIsWished(prev => !prev);
  };

  const moveToOrder = () => {
    navigate(`/order/${id}`);
  };

  return (
    <>
      <Header />
      <PageContainer>
        <MainContent></MainContent>
        <ProductTabs></ProductTabs>
        <BottomActionBar>
          <WishSection
            onClick={onClickWish}
            style={{ cursor: 'pointer' }}
          >
            <HeartIcon isWished={isWished} />
            <span>{wishCount}</span>
          </WishSection>
          <BottomOrderButton onClick={moveToOrder}>
            주문하기
          </BottomOrderButton>
        </BottomActionBar>
      </PageContainer>
    </>
  );
};

export default ProductDetailInfoPage;
