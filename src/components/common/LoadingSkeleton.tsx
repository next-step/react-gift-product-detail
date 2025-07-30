import React from 'react';
import styled from '@emotion/styled';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const SkeletonBox = styled.div<SkeletonProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '20px'};
  border-radius: ${(props) => props.borderRadius || '4px'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

interface LoadingSkeletonProps {
  type?: 'text' | 'image' | 'button' | 'card';
  lines?: number;
  height?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'text',
  lines = 1,
  height,
}) => {
  if (type === 'text') {
    return (
      <div>
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonBox
            key={index}
            height={height || '16px'}
            style={{ marginBottom: index < lines - 1 ? '8px' : '0' }}
          />
        ))}
      </div>
    );
  }

  if (type === 'image') {
    return (
      <SkeletonBox width="100%" height={height || '300px'} borderRadius="8px" />
    );
  }

  if (type === 'button') {
    return (
      <SkeletonBox
        width="120px"
        height={height || '40px'}
        borderRadius="20px"
      />
    );
  }

  if (type === 'card') {
    return (
      <div
        style={{
          padding: '16px',
          border: '1px solid #eee',
          borderRadius: '8px',
        }}
      >
        <SkeletonBox height="200px" style={{ marginBottom: '12px' }} />
        <SkeletonBox height="16px" style={{ marginBottom: '8px' }} />
        <SkeletonBox height="14px" style={{ width: '60%' }} />
      </div>
    );
  }

  return <SkeletonBox />;
};

export default LoadingSkeleton;
