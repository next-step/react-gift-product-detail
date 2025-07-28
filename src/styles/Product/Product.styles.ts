import styled from '@emotion/styled';
export const ProductDetailContainerWrapper = styled.div`
  width: 720px;
  min-width: 720px;
  ${({ theme }) => `
    background-color: ${theme.colors.gray300};
  `}
  margin: 45px 0;
`;

export const ProductoDetailInfoContainer = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`;

export const ProductoDetailImg = styled.img`
  width: 100%;
`;

export const ProductoDetailName = styled.p`
  ${({ theme }) => `
    font-size: ${theme.typography.title1Bold.fontSize};
    font-weight: ${theme.typography.title1Bold.fontWeight};
  `}
  padding: 10px;
`;

export const ProductoDetailPrice = styled.p`
  ${({ theme }) => `
    font-size: ${theme.typography.title1Bold.fontSize};
    font-weight: ${theme.typography.title1Bold.fontWeight};
  `}
  padding: 10px;
`;

export const ProductoDetailBrandContainer = styled.div`
  display: flex;
  background-color: white;
  margin-top: 1px;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;
export const ProductoDetailBrandImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
export const ProductoDetailBrand = styled.p`
  ${({ theme }) => `
    font-size: ${theme.typography.body2Regular.fontSize};
    font-weight: ${theme.typography.body2Regular.fontWeight};
  `}
`;

export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
export const ProductDetailContainer = styled.button<{ isActive?: boolean }>`
  width: 100%;
  padding: 20px;
  background-color: white;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid' : '2px solid')};
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.gray900 : theme.colors.gray300};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.gray900 : theme.colors.gray500)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => `
    font-size: ${theme.typography.body2Regular.fontSize};
    font-weight: ${theme.typography.body2Regular.fontWeight};
  `}
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
