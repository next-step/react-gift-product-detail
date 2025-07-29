import { Suspense } from 'react';
import styled from '@emotion/styled';
import ErrorBoundary from './ErrorBoundary';
import { loading } from './Loading';

interface Props {
  fallbackMessage: string;
  children: React.ReactNode;
}

const WithSuspenseBoundary = ({ fallbackMessage, children }: Props) => {
  return (
    <ErrorBoundary fallback={<FallbackText>{fallbackMessage}</FallbackText>}>
      <Suspense fallback={loading}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default WithSuspenseBoundary;

const FallbackText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.semantic.text.disabled};
  padding: ${({ theme }) => theme.spacing[6]};
`;
