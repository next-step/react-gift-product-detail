import { LoadingSpinnerContainer, Spinner, SpinText } from '@/styles/LoadingSpinner.styles';
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

function LoadingSpinner({ size = 'medium', message = '로딩 중...' }: LoadingSpinnerProps) {
  return (
    <LoadingSpinnerContainer>
      <Spinner size={size} />
      <SpinText>{message}</SpinText>
    </LoadingSpinnerContainer>
  );
}

export default LoadingSpinner;
