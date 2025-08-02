
import React, { Component } from 'react';
import type { ReactNode } from 'react';
import { css } from '@emotion/react';

// emotion css 분리 (파일 상단으로 이동)
const errorBoxStyle = css({
  padding: '20px',
  textAlign: 'center',
  border: '1px solid #dc2626',
  borderRadius: '8px',
  backgroundColor: '#fef2f2',
});

const retryButtonStyle = css({
  padding: '8px 16px',
  backgroundColor: '#dc2626',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '12px',
});

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
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 로깅 서비스에 에러를 기록
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // 실제 프로덕션에서는 에러 리포팅 서비스 사용
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 커스텀 폴백 UI 또는 기본 에러 UI
      return this.props.fallback || (
        <div css={errorBoxStyle}>
          <h2>🚨 문제가 발생했습니다</h2>
          <p>페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            css={retryButtonStyle}
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;