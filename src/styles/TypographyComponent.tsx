/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import type { ThemeType } from './theme';
import type { ReactNode, ElementType } from 'react';

export type TypographyVariant = keyof ThemeType['typography'];

type AllowedTags = Extract<ElementType, 'p' | 'span' | 'h1'>;

interface TypographyProps {
  children: ReactNode;
  variant: TypographyVariant;
  as?: AllowedTags;
  color?: string;
  className?: string;
}

const TypographyComponent = ({
  children,
  variant,
  as = 'p',
  color,
  className,
}: TypographyProps) => {
  const theme = useTheme() as ThemeType;

  const style = css({
    ...theme.typography[variant],
    color: color || theme.color.semantic.textDefault,
  });

  const Component = as;

  return (
    <Component css={style} className={className}>
      {children}
    </Component>
  );
};

export default TypographyComponent;
