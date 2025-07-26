import styled from '@emotion/styled';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;
export const ProductName = styled.div`
  font: ${({ theme }) => theme.typography.title1Bold};
  margin-bottom: 8px;
  margin-left: 16px;
`;
export const ProductPrice = styled.div`
  font: ${({ theme }) => theme.typography.title1Bold};
  margin-bottom: 16px;
  margin-left: 16px;
`;
export const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
`;
export const BigLine = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
`;
export const ProductBrandInfo = styled.div`
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
`;
export const ProductBrandImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;
export const ProductBrand = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  font: ${({ theme }) => theme.typography.body1Regular};
`;
