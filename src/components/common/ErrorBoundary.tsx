import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, info) {
    console.log('에러 발생!', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>에러가 발생했어요</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>다시 시도</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
