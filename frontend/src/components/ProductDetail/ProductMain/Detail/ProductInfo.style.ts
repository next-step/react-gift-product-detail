import styled from '@emotion/styled';

export const ProductInfoWrapper = styled.div`
  padding: ${({ theme }) => ` ${theme.spacing.spacing2} ${theme.spacing.spacing3}`};
`;

export const InfoWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing.spacing4};
`;

export const InfoName = styled.div`
  padding: ${({ theme }) => ` ${theme.spacing.spacing2} ${theme.spacing.spacing0}`};
  font-weight: bold;
`;
