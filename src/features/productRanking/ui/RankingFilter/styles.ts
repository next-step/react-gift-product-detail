import styled from '@emotion/styled';

export const FilterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

export const GenderFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

export const ActionFilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.blue[100]};
  border-radius: 10px;
`;

export const BaseButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

export const ActionButton = styled(BaseButton)<{ isSelected: boolean }>`
  margin: 0;
  text-align: left;
  ${({ theme, isSelected }) =>
    isSelected ? theme.typography.label1Bold : theme.typography.label1Regular}
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue[700] : theme.colors.gray[700]};
`;

export const GenderButton = styled(BaseButton)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GenderIconContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
  ${({ theme }) => theme.typography.label1Bold}
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue[700] : theme.colors.blue[100]};
  border-radius: 15px;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue[200] : theme.colors.blue[400]};
`;

export const GenderText = styled.p<{ isSelected: boolean }>`
  margin: 0;
  text-align: left;
  ${({ theme, isSelected }) =>
    isSelected ? theme.typography.label1Bold : theme.typography.label1Regular}
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue[700] : theme.colors.gray[700]};
`;
