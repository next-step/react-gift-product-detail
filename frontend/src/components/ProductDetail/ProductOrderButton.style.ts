import styled from '@emotion/styled';

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 100%;
  max-width: ${({ theme }) => theme.spacing.spacing720};
  height: ${({ theme }) => theme.spacing.spacing12_5};
  z-index: 100;
`;

export const WishButton = styled.button`
  width: ${({ theme }) => theme.spacing.spacing12_5};
  height: ${({ theme }) => theme.spacing.spacing12_5};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.spacing.spacing4};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;

  img {
    width: ${({ theme }) => theme.spacing.spacing3};
  }

  span {
    font-size: ${({ theme }) => theme.spacing.spacing3};
  }
`;

export const OrderButton = styled.button`
  flex: 1;
  background-color: ${({ theme }) => theme.semantic.brand.kakaoYellow};
  border: none;
  font-weight: bold;
  font-size: ${({ theme }) => theme.spacing.spacing4};
  cursor: pointer;
`;
