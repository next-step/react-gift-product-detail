import styled from "@emotion/styled";

export const ProductInfoTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export const TabSwitcherContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1.2rem;
  border-bottom: ${({ isActive }) => (isActive ? "2px solid black" : "none")};
  cursor: pointer;
`;

export const TabSwitcherRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TabSwitcherLabel = styled.p<{ isActive: boolean }>`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
  text-align: center;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
`;

export const TabContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]};
`;
