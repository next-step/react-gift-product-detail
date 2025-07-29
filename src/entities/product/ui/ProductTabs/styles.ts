import styled from '@emotion/styled';

export const TabContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.semantic.background.default};
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.spacing4} 0;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:focus {
    outline: none;
  }
`;

export const TabText = styled.p<{ isActive: boolean }>`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.gray[900] : theme.colors.gray[600])};
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`;

export const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.semantic.background.default};
`;

export const DescriptionContent = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  p {
    margin: ${({ theme }) => theme.spacing.spacing3} 0;
    ${({ theme }) => theme.typography.body1Regular};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

export const DetailContent = styled.div`
  width: 100%;
`;

export const DetailItem = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4} 0;
`;

export const DetailName = styled.h3`
  ${({ theme }) => theme.typography.subtitle2Bold};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

export const DetailValue = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
`;

export const ContentPlaceholder = styled.div`
  width: 100%;
  height: 300px;
`;
