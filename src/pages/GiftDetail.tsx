import styled from '@emotion/styled';
import { TopNavBar } from '@/components/shared/TopNavBar';
import { ProductOverview } from '@/components/gift_detail_page/ProductOverview';
import { BrandInfo } from '@/components/gift_detail_page/BrandInfo';
import { ProductDetailTabs } from '@/components/gift_detail_page/ProductDetailTabs';
import { BottomButton } from '@/components/gift_detail_page/BottomButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 100vh;
  max-width: 720px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const GiftDetail = () => {
  return (
    <Container>
      <TopNavBar title="선물하기" mainPath="/" />
      <ProductOverview />
      <BrandInfo />
      <ProductDetailTabs />
      <BottomButton />
    </Container>
  );
};

export default GiftDetail;
