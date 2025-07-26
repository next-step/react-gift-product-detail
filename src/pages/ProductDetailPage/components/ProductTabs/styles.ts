import styled from '@emotion/styled';

export const TabButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
`;

export const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px 0;
  font: ${({ theme }) => theme.typography.body1Regular};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ active, theme }) =>
      active ? theme.colors.semantic.textDefault : 'transparent'};
  color: ${({ active, theme }) =>
    active ? theme.colors.semantic.textDefault : theme.colors.gray.gray600};
  cursor: pointer;
  transition:
    border-bottom 0.2s,
    color 0.2s;
`;
