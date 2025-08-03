import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ApiError } from '@/errors/ApiError';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 404:
          return { hasError: true, errorMessage: '페이지를 찾을 수 없습니다.' };
        case 500:
          return { hasError: true, errorMessage: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' };
        default:
          return { hasError: true, errorMessage: error.message };
      }
    }
    return { hasError: true, errorMessage: '알 수 없는 오류가 발생했습니다.' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // props로 fallback이 제공되면 그것을 렌더링
      if (this.props.fallback) {
        return this.props.fallback;
      }
      // fallback이 없으면 state의 에러 메시지를 기본 UI로 보여줌
      return <div>{this.state.errorMessage}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
