import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode; // 에러 발생 시 보여줄 UI
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // 하위 컴포넌트에서 에러가 발생했을 때 호출
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  // 에러 정보를 로깅
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생하면 fallback UI 렌더링
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
