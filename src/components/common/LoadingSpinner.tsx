import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ffe812;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 16px;
  color: #666;
  font-size: 14px;
`;

interface LoadingSpinnerProps {
  text?: string;
}

function LoadingSpinner({ text = '로딩 중...' }: LoadingSpinnerProps) {
  return (
    <SpinnerContainer>
      <div style={{ textAlign: 'center' }}>
        <Spinner />
        <LoadingText>{text}</LoadingText>
      </div>
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
