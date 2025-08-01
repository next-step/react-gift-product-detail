import styled from '@emotion/styled';
import type { ReactNode, ElementType } from 'react';
import type { Theme } from '@emotion/react';
import { theme } from '@styles/tokens';

type Props = {
  children: ReactNode;
  variant?: VariantKeys;
  color?: ColorKeys;
  as?: HTMLTags;
  width?: string;
  textAlign?: 'left' | 'center' | 'right';
} & React.HTMLAttributes<HTMLElement>;

export const Typography = ({
  children,
  variant = 'body1Regular',
  color = 'textDefault',
  as = 'p',
  width,
  textAlign = 'left',
  ...rest
}: Props) => {
  return (
    <StyledTypography
      as={as as ElementType}
      variant={variant}
      colorKey={color}
      width={width}
      textAlign={textAlign}
      {...rest}
    >
      {children}
    </StyledTypography>
  );
};

const StyledTypography = styled.p<{
  variant: VariantKeys;
  colorKey: ColorKeys;
  width?: string;
  textAlign: 'left' | 'center' | 'right';
}>(({ theme, variant, colorKey, width, textAlign }) => ({
  ...theme.typography[variant],
  color: getColor(colorKey, theme),
  margin: 0,
  width,
  textAlign,
}));

// theme.colors 구조에 기반한 ColorKey 분해
type GrayColorKeys = keyof typeof theme.colors.gray;
type YellowColorKeys = keyof typeof theme.colors.yellow;
type BrownColorKeys = keyof typeof theme.colors.brown;
type BlueColorKeys = keyof typeof theme.colors.blue;
type RedColorKeys = keyof typeof theme.colors.red;
type SemanticKeys = keyof typeof theme.colors.semantic;

type ColorKeys =
  | GrayColorKeys
  | YellowColorKeys
  | BrownColorKeys
  | BlueColorKeys
  | RedColorKeys
  | SemanticKeys;

type VariantKeys = keyof typeof theme.typography;
type HTMLTagList =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label';
type HTMLTags = Extract<ElementType, HTMLTagList>;

const getColor = (colorKey: ColorKeys, theme: Theme): string => {
  // 색상 스케일 순회
  if (colorKey in theme.colors.gray) {
    return theme.colors.gray[colorKey as keyof typeof theme.colors.gray];
  }

  if (colorKey in theme.colors.yellow) {
    return theme.colors.yellow[colorKey as keyof typeof theme.colors.yellow];
  }

  if (colorKey in theme.colors.brown) {
    return theme.colors.brown[colorKey as keyof typeof theme.colors.brown];
  }

  if (colorKey in theme.colors.blue) {
    return theme.colors.blue[colorKey as keyof typeof theme.colors.blue];
  }

  if (colorKey in theme.colors.red) {
    return theme.colors.red[colorKey as keyof typeof theme.colors.red];
  }

  if (colorKey in theme.colors.semantic) {
    return theme.colors.semantic[
      colorKey as keyof typeof theme.colors.semantic
    ];
  }

  // fallback
  return theme.colors.semantic.textDefault;
};
