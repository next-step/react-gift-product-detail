import styled from "@emotion/styled";

export const LikeIconContainer = styled.div`
  height: 3.2rem;
  aspect-ratio: 1.2/1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.default};
  flex-direction: column;
  gap: 4px;
`;

export const LikeIcon = styled.img`
  width: 17px;
  height: 17px;
`;

export const LikeCount = styled.span`
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const OrderButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 720px;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  background-color: transparent;
`;

export const OrderButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
  border: none;
  border-radius: 0;

  font-size: ${({ theme }) => theme.typography.body.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
  cursor: pointer;
`;
