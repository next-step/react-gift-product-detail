import styled from '@emotion/styled';

export const TabContainer = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid rgb(238, 239, 241);
`;

export const TabContentWrapper = styled.div`
  min-height: 200px;
  padding: 20px 0 80px; 
`;

export const Tab = styled.button<{ active: boolean }>`
  position: relative;
  padding: 16px 20px;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  transition: all 0.2s;

  color: ${({ active, theme }) =>
    active ? theme.color.semantic.text.default : theme.color.semantic.text.disabled};

  border-bottom: ${({ active, theme }) =>
    active ? `2px solid ${theme.color.semantic.text.default}` : '2px solid transparent'};

  &:hover {
    color: ${({ active, theme }) =>
      active ? theme.color.semantic.text.default : theme.color.semantic.text.disabled};

    border-bottom: ${({ active }) => (active ? undefined : '2px solid transparent')};
  }

  &:focus {
    outline: none;
  }
`;

export const TabName = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;
