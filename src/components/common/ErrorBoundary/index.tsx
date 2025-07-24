import React, { useEffect, useState } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { handleApiError } from '@/apis/queryClient';
import * as S from './styles';
import { type FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 401) {
        const errorResult = handleApiError(error);
        if (errorResult.shouldRedirect && errorResult.path) {
          setRedirecting(true);
          navigate(errorResult.path, { replace: true });
        }
      } else if (status && status >= 400 && status < 500) {
        setRedirecting(true);
        navigate('/', { replace: true });
      }
    }
  }, [error, navigate]);

  if (redirecting) return null;

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
  fallback?: React.ComponentType<FallbackProps>;
}

export const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({
  children,
  fallback = ErrorFallback,
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ApiErrorBoundary;
