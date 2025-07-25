import React from 'react';

interface ErrorFallbackProps {
  error?: Error;
  onReset?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => (
  <div style={{ padding: 32, textAlign: 'center', color: '#fa342c' }}>
    <h2>문제가 발생했습니다.</h2>
    <pre>{error?.message}</pre>
    <button onClick={onReset} style={{ marginTop: 16 }}>
      다시 시도
    </button>
  </div>
);

export default ErrorFallback;
