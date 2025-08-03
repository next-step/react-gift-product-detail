import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'p' | 'span';
  children: React.ReactNode;
}

const Typography = ({ as = 'p', children, ...rest }: TypographyProps) => {
  const Component = as;
  return <Component {...rest}>{children}</Component>;
};

export default Typography;