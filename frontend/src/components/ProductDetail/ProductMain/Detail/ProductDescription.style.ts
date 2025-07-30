import styled from '@emotion/styled';

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing4};
  width: 100%;

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: ${({ theme }) => ` ${theme.spacing.spacing4} ${theme.spacing.spacing0}`};
  }
`;
