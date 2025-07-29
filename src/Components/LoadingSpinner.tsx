import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.gray.gray300};
  border-top: 4px solid ${({ theme }) => theme.colors.semantic.kakaoYellow};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const LoadingText = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  text-align: center;
`;

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = "로딩 중..." }: LoadingSpinnerProps) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner; 