import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../../hooks/useProductDetail';
import { useProductReview } from '../../hooks/useProductReview';
import type { Announcement } from '../../types/Products';

const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  border-bottom: ${({ isActive }) =>
    isActive ? '2px solid black' : 'none'};
  cursor: pointer;
`;

const TabContent = styled.div`
  padding: 24px;
`;

const ProductDescriptionContainer = styled.div`
  ${({ theme }) => theme.typography.body1Regular}
  white-space: pre-wrap;
  max-width: 100%;
  width: 100%;
  overflow-y: auto;
`;

const ProductDescription = styled.div`
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 8px auto;
  }

  p {
    margin-bottom: 12px;
    text-align: center;
  }
`;

const DetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 14px;
  color: #333;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  white-space: pre-wrap;
  line-height: 1.5;
`;

const tabList = ['상품설명', '선물후기', '상세정보'] as const;
type Tab = (typeof tabList)[number];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>('상품설명');

  const { productId } = useParams<{ productId: string }>();
  const id = Number(productId);

  const { data: product } = useProductDetail(id);
  const { data: review } = useProductReview(id);

  if (!product) return null;

  const announcemetns = product.announcements as Announcement[];

  const renderContent = () => {
    switch (activeTab) {
      case '상품설명':
        return (
          <ProductDescriptionContainer>
            <ProductDescription
              dangerouslySetInnerHTML={{
                __html: product?.description ?? '',
              }}
            ></ProductDescription>
          </ProductDescriptionContainer>
        );
      case '선물후기':
        return (
          <DetailInfoContainer>
            {review?.reviews.map(({ id, authorName, content }) => (
              <InfoRow key={id}>
                <InfoTitle>{authorName}</InfoTitle>
                <InfoValue>{content}</InfoValue>
              </InfoRow>
            ))}
          </DetailInfoContainer>
        );
      case '상세정보':
        return (
          <DetailInfoContainer>
            {announcemetns
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map(({ name, value }) => (
                <InfoRow key={name}>
                  <InfoTitle>{name}</InfoTitle>
                  <InfoValue>{value}</InfoValue>
                </InfoRow>
              ))}
          </DetailInfoContainer>
        );
    }
  };

  return (
    <>
      <TabHeader>
        {tabList.map(tab => (
          <TabButton
            key={tab}
            isActive={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabHeader>
      <TabContent>{renderContent()}</TabContent>
    </>
  );
};

export default ProductTabs;
