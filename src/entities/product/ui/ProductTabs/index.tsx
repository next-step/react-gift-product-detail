import { useState } from 'react';
import * as S from './styles';

type TabType = 'description' | 'review' | 'detail';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('description');
  // TODO: 탭 라벨 상수 분리 필요
  const tabs = [
    { id: 'description' as TabType, label: '상품설명' },
    { id: 'review' as TabType, label: '선물후기' },
    { id: 'detail' as TabType, label: '상세정보' },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  return (
    <S.TabContainer>
      {tabs.map((tab) => (
        <S.TabButton
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          tabIndex={0}
          onClick={() => handleTabClick(tab.id)}
          isActive={activeTab === tab.id}
        >
          <S.TabText isActive={activeTab === tab.id}>
            {tab.label}
          </S.TabText>
          {activeTab === tab.id && <S.ActiveIndicator />}
        </S.TabButton>
      ))}
    </S.TabContainer>
  );
};

export default ProductTabs; 