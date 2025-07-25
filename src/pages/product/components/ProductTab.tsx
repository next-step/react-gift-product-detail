import styled from "@emotion/styled";
import type { TabType } from "@/pages/product/section/ProductTabSection";
import { PRODUCT_TABS } from "@/constants/product";

type Props = {
  selected: TabType;
  onChange: (tab: TabType) => void;
};

const ProductTab = ({ selected, onChange }: Props) => {
  return (
    <TabWrapper>
      {PRODUCT_TABS.map((tab) => (
        <TabItem
          key={tab.key}
          isActive={tab.key === selected}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </TabItem>
      ))}
    </TabWrapper>
  );
};

export default ProductTab;

const TabWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.semantic.border.default};
`;

const TabItem = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing4} 0;
  text-align: center;
  border-bottom: 3px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.brand.kakao.yellow : "transparent"};
  color: ${({ theme, isActive }) =>
    isActive
      ? theme.colors.semantic.text.default
      : theme.colors.semantic.text.sub};
  ${({ theme }) => theme.typography.subtitle1Bold};
  background-color: transparent;
`;
