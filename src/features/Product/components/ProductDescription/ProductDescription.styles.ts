import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  margin-top: ${theme.spacing[4]};
  background: ${theme.colors.semanticColor.backgroundColor.default};
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.colorScale.gray[300]};
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: ${theme.spacing[3]} 0;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ isActive }) =>
    isActive
      ? theme.colors.semanticColor.textColor.default
      : theme.colors.colorScale.gray[500]};
  border-bottom: 2px solid
    ${({ isActive }) =>
      isActive ? theme.colors.semanticColor.textColor.default : 'transparent'};
`;

export const TabContent = styled.div`
  padding: ${theme.spacing[4]};
  ${theme.typography.body2Regular};

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 8 ${theme.spacing[2]} auto;
  }
`;

export const ReviewCard = styled.div`
  margin-bottom: ${theme.spacing[3]};
  border-bottom: 1px solid ${theme.colors.colorScale.gray[200]};
  padding-bottom: ${theme.spacing[2]};
`;

export const AuthorName = styled.div`
  ${theme.typography.label2Bold};
  margin-bottom: ${theme.spacing[2]};
`;

export const ReviewText = styled.div`
  ${theme.typography.body2Regular};
  color: ${theme.colors.colorScale.gray[700]};
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing[6]};
`;

export const InfoLabel = styled.div`
  color: ${theme.colors.semanticColor.textColor.default};
  margin-bottom: ${theme.spacing[1]};
  ${theme.typography.subtitle1Bold};
`;

export const InfoValue = styled.div`
  color: ${theme.colors.colorScale.gray[800]};
`;
