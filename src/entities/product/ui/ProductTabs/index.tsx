import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
import { getProductDetail, getProductHighlightReview } from '@/entities/product/api/productApi';
import { productQueryKeys } from '@/entities/product/api/queryKeys';
import type {
  ProductDetail,
  ProductHighlightReview,
  TabType,
} from '@/entities/product/model/types';
import * as S from './styles';
import { TAB_LABELS } from '@/entities/product/model/constants';

export const ProductTabs = () => {
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = productId ? Number(productId) : undefined;
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const tabs = [
    { id: 'description' as TabType, label: TAB_LABELS.description },
    { id: 'review' as TabType, label: TAB_LABELS.review },
    { id: 'detail' as TabType, label: TAB_LABELS.detail },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const { data } = useSuspenseQuery<ProductDetail>({
    queryKey: productQueryKeys.detail(numericProductId!),
    queryFn: () => getProductDetail(numericProductId!),
  });

  const { data: reviewData } = useSuspenseQuery<ProductHighlightReview>({
    queryKey: productQueryKeys.highlightReview(numericProductId!),
    queryFn: () => getProductHighlightReview(numericProductId!),
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <S.TabContent>
            <S.DescriptionContent>
              {' '}
              {/* description은 응답이 json이 아닌 html코드를 문자열로 담은 형식 */}
              {data.description ? parse(data.description) : ''}
            </S.DescriptionContent>
          </S.TabContent>
        );
      case 'review':
        return (
          <S.TabContent>
            <S.DetailContent>
              {reviewData?.reviews?.map(review => (
                <S.DetailItem key={review.id}>
                  <S.DetailName>{review.authorName}</S.DetailName>
                  <S.DetailValue>{review.content}</S.DetailValue>
                </S.DetailItem>
              ))}
            </S.DetailContent>
          </S.TabContent>
        );
      case 'detail':
        return (
          <S.TabContent>
            <S.DetailContent>
              {data.announcements?.map((item, index) => (
                <S.DetailItem key={index}>
                  <S.DetailName>{item.name}</S.DetailName>
                  <S.DetailValue>{item.value}</S.DetailValue>
                </S.DetailItem>
              ))}
            </S.DetailContent>
          </S.TabContent>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <S.TabContainer>
        {tabs.map(tab => (
          <S.TabButton
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={0}
            onClick={() => handleTabClick(tab.id)}
            isActive={activeTab === tab.id}
          >
            <S.TabText isActive={activeTab === tab.id}>{tab.label}</S.TabText>
            {activeTab === tab.id && <S.ActiveIndicator />}
          </S.TabButton>
        ))}
      </S.TabContainer>
      {renderTabContent()}
    </>
  );
};

export default ProductTabs;
