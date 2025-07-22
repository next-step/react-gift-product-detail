import styled from '@emotion/styled';

const StyledError = styled.div`
  color: ${({ theme }) => theme.colors.red.red500};
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
  max-width: 320px;
  width: 100%;
  min-height: 18px;
  visibility: ${({ visible }: { visible: boolean }) => (visible ? 'visible' : 'hidden')};
`;

interface ErrorMessageProps {
  message?: string;
  placeholder?: string;
}

const ErrorMessage = ({ message, placeholder = '에러 자리' }: ErrorMessageProps) => {
  return <StyledError visible={!!message}>{message || placeholder}</StyledError>;
};

export default ErrorMessage;
