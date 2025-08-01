import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const Footer = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 100;
  background-color: ${theme.colors.semanticColor.brandColor.kakaoYellow};
  display: flex;
  align-items: center;
`;

export const OrderText = styled.p`
  ${theme.typography.title2Bold};
`;
