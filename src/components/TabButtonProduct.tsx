import styled from "@emotion/styled"
import theme from "@/styles/theme"
import { TabButtonStyle } from "@/interfaces/TabButtonStyle"

const TabButtonProduct = styled.button<TabButtonStyle>`
  width: 100%;
  padding: ${theme.space.spacing4} ${theme.space.spacing5};
  border: none;
  background: ${theme.colors.gray00};
  cursor: pointer;

  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.gray900 : theme.colors.gray400};

  border-bottom: 2px solid
    ${({ isActive, theme }) =>
      isActive ? theme.colors.gray900 : "transparent"};
`
export default TabButtonProduct
