import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/common/Header';
import styled from '@emotion/styled';
import MainContent from '../components/product/MainContent';
import ProductTabs from '../components/product/ProductTabs';

const PageContainer = styled.div`
  padding-bottom: 40px;
`;

const BottomOrderButton = styled.div`
  position: fixed;
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

  const moveToOrder = () => {
    navigate(`/order/${id}`);
  };

  return (
    <>
      <Header />
      <PageContainer>
        <MainContent></MainContent>
        <ProductTabs></ProductTabs>
        <BottomOrderButton onClick={() => moveToOrder()}>
          주문하기
        </BottomOrderButton>
      </PageContainer>
    </>
  );
};

export default ProductDetailInfoPage;
