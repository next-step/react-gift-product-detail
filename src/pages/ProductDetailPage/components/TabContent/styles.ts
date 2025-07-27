import styled from '@emotion/styled';

export const DescriptionWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  overflow-x: auto;
  word-break: break-all;
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;
export const Reviews = styled.div`
  width: 100%;
  max-width: 720px;
  overflow-x: auto;
  word-break: break-all;
  padding-top: 16px;
`;
export const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
export const AuthorName = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
  margin-bottom: 8px;
`;
export const ReviewContent = styled.span`
  font: ${({ theme }) => theme.typography.body1Regular};
  white-space: pre-line;
`;
export const Details = styled.div`
  width: 100%;
  max-width: 720px;
  padding-top: 12px;
  overflow-x: auto;
  word-break: break-all;
`;
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
export const DetailName = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
  margin-bottom: 8px;
`;
export const DetailValue = styled.p`
  font: ${({ theme }) => theme.typography.body1Regular};
`;
