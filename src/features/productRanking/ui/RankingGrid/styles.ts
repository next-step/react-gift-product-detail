import styled from '@emotion/styled';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing3};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  width: 100%;
`;

export const MoreButton = styled.button`
  width: 70%;
  padding: ${({ theme }) => theme.spacing.spacing3};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  ${({ theme }) => theme.typography.body2Regular}
  color: ${({ theme }) => theme.semantic.text.default};
  display: block;
  margin: ${({ theme }) => theme.spacing.spacing10} auto ${({ theme }) => theme.spacing.spacing8};
`;
