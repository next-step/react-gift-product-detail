import styled from '@emotion/styled';

export const ProductContainer = styled.div`
  margin: 0 auto;
  background-color: ${({ theme }) => theme.semantic.background.default};
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

export const ProductName = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
  padding-left: ${({ theme }) => theme.spacing.spacing3};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

export const ProductPrice = styled.div`
  ${({ theme }) => theme.typography.title1Bold};
  padding-left: ${({ theme }) => theme.spacing.spacing3};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  span {
    ${({ theme }) => theme.typography.title1Regular};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

export const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[400]};
  margin: ${({ theme }) => theme.spacing.spacing4} 0;
  height: 1px;
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${({ theme }) => theme.spacing.spacing3};
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

export const BrandImage = styled.img`
  width: ${({ theme }) => theme.spacing.spacing8};
  height: ${({ theme }) => theme.spacing.spacing8};
  border-radius: 50%;
`;

export const BrandName = styled.span`
  ${({ theme }) => theme.typography.subtitle1Regular};
`;