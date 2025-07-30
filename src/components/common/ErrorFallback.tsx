import React from 'react';

interface ErrorFallbackProps {
  error?: Error;
  onReset?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => {
  return (
    <div style={{ padding: 32, textAlign: 'center', color: '#fa342c' }}>
      <h2>상품 정보 오류</h2>
      <p>{error?.message}</p>
      <button onClick={onReset} style={{ marginTop: 16 }}>
        다시 시도
      </button>
    </div>
  );
};

export default ErrorFallback;
