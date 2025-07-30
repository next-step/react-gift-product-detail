import styled from '@emotion/styled';

export const ProductHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray00};
  padding: ${({ theme }) => ` ${theme.spacing.spacing0} ${theme.spacing.spacing5}`};
`;

export const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

export const ProductName = styled.h1`
  font-size: ${({ theme }) => theme.spacing.spacing6};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

export const ProductPrice = styled.h3`
  font-size: ${({ theme }) => theme.spacing.spacing5};
  padding-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

export const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray00};
  border-top: 1.5px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => ` ${theme.spacing.spacing3} ${theme.spacing.spacing5}`};
`;

export const BrandImage = styled.img`
  width: ${({ theme }) => theme.spacing.spacing9};
  margin-right: ${({ theme }) => theme.spacing.spacing3};
`;
