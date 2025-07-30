import type { ProductDetailTab } from '../ProductDetail';
import styled from '@emotion/styled';

interface Props {
  activeTab: ProductDetailTab;
  setActiveTab: (tab: ProductDetailTab) => void;
}

const TabMenu = ({ activeTab, setActiveTab }: Props) => {
  return (
    <TabContainer>
      <TabButton
        $active={activeTab === 'description'}
        onClick={() => setActiveTab('description')}
      >
        상품설명
      </TabButton>
      <TabButton
        $active={activeTab === 'review'}
        onClick={() => setActiveTab('review')}
      >
        선물후기
      </TabButton>
      <TabButton
        $active={activeTab === 'detailInfo'}
        onClick={() => setActiveTab('detailInfo')}
      >
        상세정보
      </TabButton>
    </TabContainer>
  );
};

export default TabMenu;

const TabContainer = styled.div(({ theme }) => ({
  display: 'flex',
  borderBottom: `2px solid ${theme.colors.semantic.backgroundDisabled}`,
}));

const TabButton = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  flex: '1',
  padding: theme.spacing.spacing3,
  backgroundColor: theme.colors.semantic.backgroundDefault,
  border: 'none',
  ...theme.typography.body1Regular,
  borderBottom: $active
    ? `3px solid ${theme.colors.semantic.textDefault}`
    : 'none',
  color: $active
    ? theme.colors.semantic.textDefault
    : theme.colors.semantic.textDisabled,
}));
