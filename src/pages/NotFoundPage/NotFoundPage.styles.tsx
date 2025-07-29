import styled from "@emotion/styled";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: calc(
    100vh - ${({ theme }) => theme.components.navigationBar.height}
  );
  padding-top: ${({ theme }) => theme.spacing[16]};

  background-color: ${({ theme }) => theme.colors.background.disabled};
`;

export const CharacterImage = styled.img`
  width: 200px;
  height: 200px;

  margin-bottom: ${({ theme }) => theme.spacing[5]};
  object-fit: contain;
`;

export const HomeButton = styled.button`
  width: 25%;
  height: 48px;

  border: none;
  background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
  color: ${({ theme }) => theme.colors.text.default};

  font-size: ${({ theme }) =>
    theme.typography.subtitle.subtitle1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.subtitle.subtitle1Regular.fontWeight};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.kakaoYellowHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.brand.kakaoYellowPressed};
  }
`;
