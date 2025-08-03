import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import HeartButtonImg from '@/assets/heart.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.colorScale.gray[0]};
  width: ${theme.spacing[13]};
  height: ${theme.spacing[12]};
  padding: ${theme.spacing[7]};
`;

export const WishIcon = styled.img<{ isWished: boolean }>`
  width: ${theme.spacing[6]};
  height: ${theme.spacing[6]};
  margin-top: ${theme.spacing[1]};
  filter: ${(props) =>
    props.isWished
      ? 'brightness(0) saturate(100%) sepia(1) hue-rotate(-10deg) saturate(500%) brightness(0.9)'
      : 'grayscale(100%)'};
`;

export const CountText = styled.div`
  ${theme.typography.label2Regular};
  color: ${theme.colors.colorScale.gray[900]};
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const heartButtonSrc = HeartButtonImg;
