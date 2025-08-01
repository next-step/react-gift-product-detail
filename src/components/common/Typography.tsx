import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'p' | 'span';
  children: React.ReactNode;
}

const Typography = ({ variant = 'p', children, ...rest }: TypographyProps) => {
  const Tag = variant;
  return <Tag {...rest}>{children}</Tag>;
};

export default Typography;
