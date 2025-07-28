import styled from "@emotion/styled";

const ErrorContainer = styled.div(({ theme }) => ({
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing10,
  backgroundColor: theme.color.gray[0],
}));

const ErrorTitle = styled.h3(({ theme }) => ({
  fontSize: theme.typography.title2Bold.fontSize,
  fontWeight: theme.typography.title2Bold.fontWeight,
  color: theme.color.gray[800],
  marginBottom: theme.spacing3,
  textAlign: "center",
}));

const ErrorMessage = styled.p(({ theme }) => ({
  fontSize: theme.typography.body1Bold.fontSize,
  color: theme.color.gray[900],
  marginBottom: theme.spacing5,
  textAlign: "center",
  lineHeight: "1.5",
}));

const RetryButton = styled.button(({ theme }) => ({
  padding: `${theme.spacing3} ${theme.spacing5}`,
  backgroundColor: theme.color.semantic.kakaoYellow,
  color: theme.color.gray[900],
  border: "none",
  borderRadius: "6px",
  fontSize: theme.typography.body2Bold.fontSize,
  fontWeight: theme.typography.body2Bold.fontWeight,
  cursor: "pointer",
  transition: "background-color 0.2s ease",
}));

interface FallbackProps {
  onRetry: () => void;
  title?: string;
  message?: string;
}

export const MainPageErrorFallback = ({
  onRetry,
  title = "데이터를 불러올 수 없습니다",
  message = "네트워크 연결을 확인하고 다시 시도해주세요.",
}: FallbackProps) => {
  return (
    <ErrorContainer>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorMessage>{message}</ErrorMessage>
      <RetryButton onClick={onRetry}>다시 시도</RetryButton>
    </ErrorContainer>
  );
};
