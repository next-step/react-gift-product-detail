import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { handleApiError } from '@/apis/queryClient';
import * as S from './styles';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

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

interface ApiErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  { fallback: React.ComponentType<FallbackProps>; children: React.ReactNode },
  ApiErrorBoundaryState
> {
  constructor(props: {
    fallback: React.ComponentType<FallbackProps>;
    children: React.ReactNode;
  }) {
    super(props);
    this.state = { error: null };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  // componentDidCatch(error: Error, info: React.ErrorInfo) {}

  resetErrorBoundary() {
    this.setState({ error: null });
    window.location.reload();
  }

  render() {
    const { error } = this.state;
    const { fallback: FallbackComponent, children } = this.props;
    if (error) {
      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }
    return children;
  }
}

export const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({
  children,
  fallback = ErrorFallback,
}) => {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
};

export default ApiErrorBoundary;
