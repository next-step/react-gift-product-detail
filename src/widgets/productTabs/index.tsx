import { useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { TabType } from '@/entities/product/model/types';
import * as S from './styles';
import { TAB_LABELS } from '@/entities/product/model/constants';
import { Loading } from '@/shared/ui';
import { DescriptionTabContent, ReviewTabContent, DetailTabContent } from './components';

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

  const renderTabContent = () => {
    if (!numericProductId) return null;

    switch (activeTab) {
      case 'description':
        return (
          <Suspense fallback={<Loading height="200px" />}>
            <DescriptionTabContent productId={numericProductId} />
          </Suspense>
        );
      case 'review':
        return (
          <Suspense fallback={<Loading height="200px" />}>
            <ReviewTabContent productId={numericProductId} />
          </Suspense>
        );
      case 'detail':
        return (
          <Suspense fallback={<Loading height="200px" />}>
            <DetailTabContent productId={numericProductId} />
          </Suspense>
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
