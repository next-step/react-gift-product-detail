import React, { Component } from 'react';
import styled from '@emotion/styled';

export default class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error(error);
  }
  render() {
    if (this.state.hasError) {
      return <ErrorMsg>오류가 발생했습니다.</ErrorMsg>;
    }
    return this.props.children;
  }
}

const ErrorMsg = styled.div`
  padding: 2rem;
  text-align: center;
  color: red;
`;
