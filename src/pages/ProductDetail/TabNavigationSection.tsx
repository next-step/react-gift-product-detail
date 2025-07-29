import React from 'react';
import { TabNavigation, TabButton } from './ProductDetail.styles';

type TabType = 'description' | 'reviews' | 'detail';

interface TabNavigationSectionProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigationSection: React.FC<TabNavigationSectionProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <TabNavigation>
      <TabButton
        active={activeTab === 'description'}
        onClick={() => onTabChange('description')}
      >
        상품설명
      </TabButton>
      <TabButton
        active={activeTab === 'reviews'}
        onClick={() => onTabChange('reviews')}
      >
        선물후기
      </TabButton>
      <TabButton
        active={activeTab === 'detail'}
        onClick={() => onTabChange('detail')}
      >
        상세정보
      </TabButton>
    </TabNavigation>
  );
};

export default TabNavigationSection;
