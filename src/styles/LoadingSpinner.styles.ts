const sizeMap = {
  small: '20px',
  medium: '40px',
  large: '60px',
};

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  margin-top: 100px;
  gap: 16px;
`;

export const Spinner = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  width: ${(props) => sizeMap[props.size]};
  height: ${(props) => sizeMap[props.size]};
  border: 3px solid #f3f3f3;
  border-top: 3px solid #ff4757;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const SpinText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;
