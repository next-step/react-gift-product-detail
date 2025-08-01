import React from 'react';

type HeartIcon = {
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  className?: string;
};

export const HeartIcon: React.FC<HeartIcon> = ({
  size = 24,
  strokeWidth = 1.5,
  strokeColor = '#2a3038',
  fillColor = 'none',
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
};
