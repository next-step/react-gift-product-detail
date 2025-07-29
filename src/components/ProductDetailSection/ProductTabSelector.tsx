import styled from '@emotion/styled';
import {
  PRODUCT_DETAIL_TABS,
  type ProductDetailTab,
} from '@/constants/productDetail';

interface Props {
  selectedTab: ProductDetailTab;
  onSelectTab: (tab: ProductDetailTab) => void;
}

const ProductTabSelector = ({ selectedTab, onSelectTab }: Props) => {
  return (
    <TabList>
      {PRODUCT_DETAIL_TABS.map(tab => (
        <TabButton
          key={tab}
          isSelected={tab === selectedTab}
          onClick={() => onSelectTab(tab)}
        >
          {tab}
        </TabButton>
      ))}
    </TabList>
  );
};

export default ProductTabSelector;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[200]};
`;

const TabButton = styled.button<{ isSelected: boolean }>`
  flex: 1;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  text-align: center;
  ${({ theme }) => theme.typography.title.title2Bold};
  color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.color.semantic.text.default
      : theme.color.semantic.text.sub};
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 400)};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `2px solid ${theme.color.semantic.text.default}` : 'none'};
  cursor: pointer;
`;
