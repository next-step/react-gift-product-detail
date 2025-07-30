import styled from '@emotion/styled';

export const DetailContainer = styled.div`
  padding: 20px;
  background-color: white;
  line-height: 1.6;
`;
export const DetailItem = styled.div`
  margin-bottom: 20px;
`;
export const DetailAuthor = styled.p`
  margin: 0;
  ${({ theme }) => `
    font-size: ${theme.typography.body2Regular.fontSize};
    font-weight: bold;
  `}
`;
