import styled from '@emotion/styled';

export type TabType = 'description' | 'reviews' | 'details';

interface ProductDetailTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabContainer = styled.div`
  display: flex;
  background: #fff;
  border-bottom: 1px solid #eeeff1;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px 0;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  color: ${(props) => (props.active ? '#2a3038' : '#868b94')};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${(props) => (props.active ? '#217cf9' : 'transparent')};
  }

  &:hover {
    color: ${(props) => (props.active ? '#2a3038' : '#555d6d')};
  }
`;

const ProductDetailTabs = ({
  activeTab,
  onTabChange,
}: ProductDetailTabsProps) => {
  return (
    <TabContainer>
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
        active={activeTab === 'details'}
        onClick={() => onTabChange('details')}
      >
        상세정보
      </TabButton>
    </TabContainer>
  );
};

export default ProductDetailTabs;
