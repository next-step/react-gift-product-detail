import styled from '@emotion/styled';
import { Z_INDEX } from '@/shared/styles/zIndex';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  max-width: 720px;
  height: 48px;
  z-index: ${Z_INDEX.FIXED_BOTTOM};
  left: 50%;
  transform: translateX(-50%);
`;

export const WishButton = styled.button<{ isWished: boolean }>`
  background-color: ${({ theme }) => theme.semantic.background.default};
  padding: ${({ theme }) => theme.spacing.spacing2};
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 60px;
`;

export const OrderButton = styled.button`
  flex: 1;
  background-color: ${({ theme }) => theme.semantic.brand.kakaoYellow};
  color: ${({ theme }) => theme.colors.gray[900]};
  border: none;
  ${({ theme }) => theme.typography.body1Bold};
  cursor: pointer;
`;
