import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: calc(-2.75rem + 100vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Logo = styled.img`
  width: 5.5rem;
  color: rgb(42, 48, 56);
`;

export const EmailInput = styled.input`
  width: 60%;
  height: 2.5rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.semantic.border.default};
  font-size: 1rem;
`;

export const PwInput = styled.input`
  width: 60%;
  height: 2.5rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.semantic.border.default};
  font-size: 1rem;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.color.red.red700};
  font-size: 0.875rem;
`;