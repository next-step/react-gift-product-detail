import styled from "@emotion/styled";

export function FallbackMessage({ message }: { message: string }) {
  return (
    <ErrorContainer>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 124px;
  margin-bottom: 124px;
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
`;
