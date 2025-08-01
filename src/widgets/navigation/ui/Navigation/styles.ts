import styled from '@emotion/styled';
import { Z_INDEX } from '@/shared/styles/zIndex';

export const Nav = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 100%;
  max-width: 720px;
  height: 48px;
  padding: 0 ${({ theme }) => theme.spacing.spacing4};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.border.default};
  z-index: ${Z_INDEX.NAVIGATION};
  left: 50%;
  transform: translateX(-50%);
`;

export const Logo = styled.img`
  height: 42px;
  cursor: pointer;
`;
