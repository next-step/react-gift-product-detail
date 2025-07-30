import styled from "@emotion/styled";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

export default function LoadingSpinner({
  size = "medium",
  message,
}: LoadingSpinnerProps) {
  return (
    <Container>
      <Spinner size={size} />
      {message && <Message>{message}</Message>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
`;

const Spinner = styled.div<{ size: string }>`
  width: ${({ size }) => {
    switch (size) {
      case "small":
        return "20px";
      case "large":
        return "40px";
      default:
        return "30px";
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case "small":
        return "20px";
      case "large":
        return "40px";
      default:
        return "30px";
    }
  }};
  border: 3px solid ${({ theme }) => theme.colors.gray[200]};
  border-top: 3px solid ${({ theme }) => theme.colors.kakao.yellow.default};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 1rem 0 0 0;
  text-align: center;
`;
