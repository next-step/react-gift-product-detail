import { Component} from "react";
import type {ReactNode} from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <p>문제가 발생했습니다. 다시 시도해주세요.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
