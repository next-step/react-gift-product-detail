import React from 'react';
import { TAB_LIST, type TabKey } from '../../constants/tabs';
import * as S from './styles';

interface ProductTabsProps {
  selectedTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  selectedTab,
  onTabChange,
}) => {
  return (
    <S.TabButtonWrapper>
      {TAB_LIST.map((tab) => (
        <S.TabButton
          key={tab.key}
          active={selectedTab === tab.key}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </S.TabButton>
      ))}
    </S.TabButtonWrapper>
  );
};

export default ProductTabs;
