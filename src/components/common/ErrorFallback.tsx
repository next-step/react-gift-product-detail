import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import styled from "@emotion/styled";
import { useEffect } from "react";

export function ErrorFallback({ error }: { error: any }) {
  const handleApiError = useApiErrorHandler({
    fallbackMessage: "알 수 없는 오류가 발생했습니다.",
  });

  const isApiError = error?.response?.status;

  useEffect(() => {
    if (isApiError) {
      handleApiError(error);
    }
  }, [isApiError, error, handleApiError]);

  return (
    <Wrapper>
      <Title>에러가 발생했습니다</Title>
      <Message>
        {isApiError
          ? error?.response?.data?.data?.message || error?.message
          : error?.message}
      </Message>
      <Button onClick={() => window.location.reload()}>새로고침</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  font-weight: bold;
  margin-bottom: 16px;
`;

const Message = styled.div`
  margin-bottom: 24px;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
`;

const Button = styled.button`
  margin: 0 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.kakaoYellow};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default ErrorFallback;
