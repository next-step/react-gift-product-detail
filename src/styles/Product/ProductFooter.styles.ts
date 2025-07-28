import styled from '@emotion/styled';

export const FooterContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  max-width: 720px;
  width: 720px;
  height: 45px;
  margin: 0 auto;
  background-color: white;
`;
export const FooterLikeButton = styled.button`
  width: 70px;
  height: 100%;
  background-color: white;
  cursor: pointer;
  border: none;
`;
export const FooterOrderButton = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  color: black;
  border: none;
  transition: background-color 0.3s ease;
  ${({ theme }) => `
      font-size: ${theme.typography.title2Bold.fontSize};
      font-weight: ${theme.typography.title2Bold.fontWeight};
    `}
`;
