import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';
import Text from '@/common/Text';
import LoadingSpinner from '@/common/LoadingSpinner';
import useProductDetail from '@/hooks/useProductDetail';
import NavigationBar from '@/common/NavigationBar';
import ProductOverview from '@/components/productDetail/ProductOverview';
import BaseButton from '@/common/BaseButton';
import ProductDescriptionTab from '@/components/productDetail/productDetailTabs/ProductDescriptionTab';
import ProductReviewsTab from '@/components/productDetail/productDetailTabs/ProductReviewsTab';
import ProductDetailInfoTab from '@/components/productDetail/productDetailTabs/ProductDetailInfoTab';
import WishBtn from '@/components/productDetail/WishBtn';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const {
    product,
    description,
    highlightReview,
    wish,
    isLoading,
    isError,
    error,
  } = useProductDetail(Number(productId));

  const [activeTab, setActiveTab] = useState<
    'description' | 'reviews' | 'detail'
  >('description');

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Text>{(error as Error)?.message}</Text>;
  if (!product) return <Text>상품 정보를 찾을 수 없습니다.</Text>;

  const handleOrderClick = () => {
    navigate(`/order/${product.id}`);
  };

  return (
    <Layout>
      <Content>
        <NavigationBar />
        <ProductOverview product={product} />

        <TabContainer>
          <TabButton
            isActive={activeTab === 'description'}
            onClick={() => setActiveTab('description')}
          >
            상품설명
          </TabButton>
          <TabButton
            isActive={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
          >
            선물후기
          </TabButton>
          <TabButton
            isActive={activeTab === 'detail'}
            onClick={() => setActiveTab('detail')}
          >
            상세정보
          </TabButton>
        </TabContainer>

        <TabContent>
          {activeTab === 'description' && (
            <ProductDescriptionTab description={description} />
          )}
          {activeTab === 'reviews' && (
            <ProductReviewsTab highlightReview={highlightReview} />
          )}
          {activeTab === 'detail' && (
            <ProductDetailInfoTab description={description} />
          )}
        </TabContent>

        <ButtonRow>
          <WishBtn
            isWished={wish?.isWished ?? false}
            wishCount={wish?.wishCount}
          />
          <BaseButton onClick={handleOrderClick} backgroundColor="#FEE500">
            <Text size="title2" weight="bold">
              주문하기
            </Text>
          </BaseButton>
        </ButtonRow>
      </Content>
    </Layout>
  );
};

export default ProductDetail;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 720px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: ${({ theme }) => theme.spacing.spacing6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

interface TabButtonProps {
  isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.gray900 : theme.colors.gray600};
  border-bottom: ${({ isActive, theme }) =>
    isActive ? `2px solid ${theme.colors.gray900}` : 'none'};
  cursor: pointer;
  outline: none;
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing6};
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.spacing2};
  margin-top: ${({ theme }) => theme.spacing.spacing6};
`;
