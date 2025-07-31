import { UnauthorizedError, ApiError } from "@/api/custom-error";
import { API_ERROR_MESSAGE } from "@/constants";
import { showToast } from "@/utils";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: (resetErrorBoundary: () => void) => ReactNode;
  onUnauthorized?: () => void;
  onClientError?: () => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("에러 바운더리에서 에러가 잡혔습니다:", error, errorInfo);

    if (error instanceof UnauthorizedError) {
      showToast.error(API_ERROR_MESSAGE.LOGIN);
      this.props.onUnauthorized?.();
    } else if (
      error instanceof ApiError &&
      error.statusCode >= 400 &&
      error.statusCode < 500
    ) {
      showToast.error(error.message);
      this.props.onClientError?.();
    } else {
      showToast.error(API_ERROR_MESSAGE.DEFAULT);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <div role="alert">{this.props.fallback(this.handleReset)}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
