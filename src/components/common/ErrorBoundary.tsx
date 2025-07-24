import * as React from "react";

type Props = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("getDerivedStateFromError: ", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const ownerStack = (
      React as unknown as { captureOwnerStack?: () => string }
    ).captureOwnerStack?.();

    console.error("ErrorBoundary 에러: ", error);
    console.error("Component 스택: ", info.componentStack);

    if (ownerStack) {
      console.error("OwnerStack: ", ownerStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
