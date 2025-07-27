import styled from '@emotion/styled';

export const ButtonContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 720px;
  height: 50px;
  background: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 100;
`;

export const Heart = styled.button`
  width: 4rem;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;

export const HeartIcon = styled.svg<{ liked: boolean }>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: fill 0.2s;
  fill: ${({ liked }) => (liked ? '#FF4500' : 'none')};
  stroke: ${({ theme }) => theme.colors.semantic.textDefault};
  stroke-width: ${({ liked }) => (liked ? 0 : 1.5)};
`;
export const HeartPath = styled.path``;
export const HeartCount = styled.div`
  font: ${({ theme }) => theme.typography.label2Regular};
  font-size: 0.625rem;
`;

export const OrderButton = styled.button`
  font: ${({ theme }) => theme.typography.body1Bold};
  width: 720px;
  height: 50px;
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  border: none;
  cursor: pointer;
`;
