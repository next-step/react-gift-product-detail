import styled from '@emotion/styled';

export const ProductDetailWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray00};
  margin-top: ${({ theme }) => theme.spacing.spacing2};
  padding-bottom: ${({ theme }) => theme.spacing.spacing19};
  min-height: 60vh;
`;

export const TabButtonWrapper = styled.div`
  display: flex;
  border-bottom: 0.75px solid ${({ theme }) => theme.colors.gray400};
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

export const ProductTabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding: ${({ theme }) => ` ${theme.spacing.spacing4} ${theme.spacing.spacing0}`};
  font-size: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.gray00};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.gray900 : theme.colors.gray500)};
  border: none;
  border-bottom: 1.5px solid
    ${({ theme, isActive }) => (isActive ? theme.colors.gray900 : theme.colors.gray00)};
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  cursor: pointer;
  transition: border-bottom 0.2s ease;
`;
