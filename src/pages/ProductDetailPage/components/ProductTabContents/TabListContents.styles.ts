import styled from "@emotion/styled";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

export const TabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const TabContentTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.body.body2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body2Bold.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const TabContentContent = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
`;
