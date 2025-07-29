import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // 에러가 발생했는지 여부를 저장하는 state
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // 에러가 발생하면 자동으로 실행되는 함수
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  // 실제 에러 정보를 콘솔에 찍거나 서버로 보낼 수 있음
  componentDidCatch(error, info) {
    console.log('에러 발생!', error, info);
  }

  // "다시 시도하기" 버튼을 눌렀을 때 에러 초기화
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    // 에러가 발생했으면 에러 UI 보여줌
    if (this.state.hasError) {
      return (
        <div>
          <h2>에러가 발생했어요 😢</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>다시 시도</button>
        </div>
      );
    }

    // 에러가 없으면 원래 컴포넌트 보여줌
    return this.props.children;
  }
}

export default ErrorBoundary;
