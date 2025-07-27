import styled from '@emotion/styled';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
`;
export const BigLine = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
`;
export const TabContent = styled.div`
  min-height: 200px;
  padding: 20px;
  margin-bottom: 60px;
`;
