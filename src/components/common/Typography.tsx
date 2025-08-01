/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import type { ReactNode, ElementType } from 'react';
import type { JSX } from '@emotion/react/jsx-runtime';
import type { ThemeType } from '../../styles/ThemeType';

type TextType = keyof ThemeType['typography'];
type NativeTags = Extract<keyof JSX.IntrinsicElements, string>;

interface Props {
  children: ReactNode;
  variant: TextType;
  as?: ElementType | NativeTags;
  color?: string;
  className?: string;
}

const Typography = ({
  children,
  variant,
  as: Tag = 'p',
  color,
  className,
}: Props) => {
  const theme = useTheme() as ThemeType;
  const appliedColor = color ?? theme.colors.textDefault;

  const textStyle = css`
    ${theme.typography[variant]};
    color: ${appliedColor};
  `;

  return (
    <Tag css={textStyle} className={className}>
      {children}
    </Tag>
  );
};

export default Typography;
