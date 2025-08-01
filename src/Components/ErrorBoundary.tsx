import React, { Component, type ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.red.red700};
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
`;

const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  border: none;
  padding: ${({ theme }) => theme.spacing.button.padding};
  border-radius: ${({ theme }) => theme.spacing.button.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.semantic.kakaoYellowHover};
  }
`;

const DefaultErrorFallback = ({ error, resetError }: { error?: Error; resetError: () => void }) => (
  <ErrorContainer>
    <ErrorIcon>⚠️</ErrorIcon>
    <ErrorTitle>오류가 발생했습니다</ErrorTitle>
    <ErrorMessage>
      {error?.message || '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.'}
    </ErrorMessage>
    <RetryButton onClick={resetError}>
      다시 시도
    </RetryButton>
  </ErrorContainer>
);

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <DefaultErrorFallback 
          error={this.state.error} 
          resetError={this.resetError} 
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 