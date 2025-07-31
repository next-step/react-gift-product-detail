import React from 'react';

interface Props {
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class CustomErrorBoundary extends React.Component<
  React.PropsWithChildren<Props>,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('Error caught in boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p>문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
    }

    return this.props.children;
  }
}
