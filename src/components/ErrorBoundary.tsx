import React, { Component } from 'react';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 20px;
  text-align: center;
  background: #fff;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #ff3b30;
`;

const ErrorTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin: 0 0 12px 0;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  background: #ffe812;
  color: #222;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #f4d800;
  }
`;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

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

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // 커스텀 fallback이 제공된 경우 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 에러 UI
      return (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>문제가 발생했습니다</ErrorTitle>
          <ErrorMessage>
            페이지를 불러오는 중 오류가 발생했습니다.
            <br />
            다시 시도해주세요.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>다시 시도</RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
