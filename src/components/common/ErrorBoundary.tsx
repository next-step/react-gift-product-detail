import React from 'react';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: 20, textAlign: 'center' }}>
            <p>문제가 발생했어요 🥲</p>
            <button onClick={() => location.reload()}>새로고침</button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
