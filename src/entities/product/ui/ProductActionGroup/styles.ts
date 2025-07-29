import styled from '@emotion/styled';
import { Z_INDEX } from '@/shared/styles/zIndex';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 720px;
  height: 60px;
  z-index: ${Z_INDEX.FIXED_BOTTOM};
`;

export const WishButton = styled.button<{ isWished: boolean }>`
  background-color: ${({ theme }) => theme.semantic.background.default};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border: none;
  cursor: pointer;
`;

export const OrderButton = styled.button`
  flex: 1;
  background-color: ${({ theme }) => theme.semantic.brand.kakaoYellow};
  color: ${({ theme }) => theme.colors.gray[900]};
  border: none;
  ${({ theme }) => theme.typography.body1Bold};
  cursor: pointer;
`;
