import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorMessage } from "@/shared/ui";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorMessage message="에러가 발생했어요! 다시 시도해주세요." />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;