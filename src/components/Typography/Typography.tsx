import styled from "@emotion/styled";
import type { ReactNode, ElementType } from "react";
import type { Theme } from "@emotion/react";
import { theme } from "@/styles/theme";

type Props = {
  children: ReactNode;
  variant?: VariantKeys;
  color?: ColorKeys;
  as?: HTMLTags;
  width?: string;
  textAlign?: "left" | "center" | "right";
} & React.HTMLAttributes<HTMLElement>;

export const Typography = ({
  children,
  variant = "body1Regular",
  color = "text-default",
  as = "p",
  width,
  textAlign,
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
  width?: Props["width"];
  textAlign?: Props["textAlign"];
}>(({ variant, colorKey, theme, width, textAlign = "left" }) => ({
  ...getTypographyStyles(variant, theme),
  color: getColor(colorKey, theme),
  margin: 0,
  width,
  textAlign,
}));

type VariantKeys =
  | keyof typeof theme.typography.title
  | keyof typeof theme.typography.subtitle
  | keyof typeof theme.typography.body
  | keyof typeof theme.typography.label;

type ColorKeys =
  | keyof typeof theme.colors.text
  | keyof typeof theme.colors.brand
  | keyof typeof theme.colors.status
  | keyof typeof theme.colors.border;

type HTMLTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "label"
  | "strong"
  | "em"
  | "small";

const getTypographyStyles = (variant: VariantKeys, theme: Theme) => {
  const { typography } = theme;

  if (variant.startsWith("title")) {
    return typography.title[variant as keyof typeof typography.title];
  }
  if (variant.startsWith("subtitle")) {
    return typography.subtitle[variant as keyof typeof typography.subtitle];
  }
  if (variant.startsWith("body")) {
    return typography.body[variant as keyof typeof typography.body];
  }
  if (variant.startsWith("label")) {
    return typography.label[variant as keyof typeof typography.label];
  }

  return typography.body.body1Regular;
};

const getColor = (colorKey: ColorKeys, theme: Theme) => {
  if (colorKey in theme.colors.brand) {
    return theme.colors.brand[colorKey as keyof typeof theme.colors.brand];
  }

  if (colorKey in theme.colors.text) {
    return theme.colors.text[colorKey as keyof typeof theme.colors.text];
  }

  if (colorKey in theme.colors.status) {
    return theme.colors.status[colorKey as keyof typeof theme.colors.status];
  }

  if (colorKey in theme.colors.border) {
    return theme.colors.border[colorKey as keyof typeof theme.colors.border];
  }

  return theme.colors.text["text-default"];
};
