import styled from "@emotion/styled";

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => (
  <Wrapper>
    <Message>에러가 발생했습니다: {error.message}</Message>
    <RetryButton onClick={resetErrorBoundary}>다시 시도</RetryButton>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 40px 0;
  text-align: center;
`;

const Message = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
  margin-bottom: 16px;
`;

const RetryButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f7f8f9;
  color: #2a3038;
  border: 1px solid #dcdee3;
  cursor: pointer;
`;
