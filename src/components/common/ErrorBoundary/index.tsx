import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { handleApiError } from '@/apis/queryClient';
import * as S from './styles';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (error instanceof AxiosError) {
      const errorResult = handleApiError(error);
      if (errorResult.shouldRedirect && errorResult.path) {
        navigate(errorResult.path);
      }
    }
  }, [error, navigate]);

  return (
    <S.ErrorContainer>
      <S.ErrorIcon>⚠️</S.ErrorIcon>
      <S.ErrorTitle>오류가 발생했습니다</S.ErrorTitle>
      <S.ErrorMessage>
        {error instanceof AxiosError
          ? error.response?.data?.message || error.message
          : error.message}
      </S.ErrorMessage>
      <S.RetryButton onClick={resetErrorBoundary}>다시 시도</S.RetryButton>
    </S.ErrorContainer>
  );
};

interface ApiErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({
  children,
  fallback = ErrorFallback,
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback}
      onReset={() => {
        // 에러 상태를 리셋하고 컴포넌트를 다시 마운트
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ApiErrorBoundary;
