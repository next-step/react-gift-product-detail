import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.spacing4};
`;

export const OrderButton = styled.button`
  position: fixed;
  bottom: 0;
  width: 720px;
  height: 60px;
  background-color: ${({ theme }) => theme.semantic.brand.kakaoYellow};
  color: ${({ theme }) => theme.colors.gray[900]};
  border: none;
  ${({ theme }) => theme.typography.body1Bold};
  cursor: pointer;
  z-index: 1000;
  
  &:hover {
    background-color: ${({ theme }) => theme.semantic.brand.kakaoYellowHover};
  }
  
  &:active {
    background-color: ${({ theme }) => theme.semantic.brand.kakaoYellowActive};
  }
`;