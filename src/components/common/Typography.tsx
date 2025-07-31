import { css, useTheme } from "@emotion/react";
import type { HTMLAttributes, ReactNode, ElementType, JSX } from "react";

type TypographyKey = keyof ReturnType<typeof useTheme>["typography"];

type ColorPath =
  | "semantic.text.default"
  | "semantic.text.sub"
  | "semantic.text.disabled"
  | "semantic.text.placeholder"
  | "brand.kakao.yellow"
  | "brand.kakao.brown"
  | "colorScale.gray.gray800";

type AsProp = keyof JSX.IntrinsicElements;

export interface TypographyProps<T extends AsProp = "span">
  extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  typo: TypographyKey;
  color?: ColorPath;
  as?: T;
}

const getColorFromTheme = (
  theme: ReturnType<typeof useTheme>,
  path: string,
): string => {
  const keys = path.split(".");
  let result: unknown = theme.colors;
  for (const key of keys) {
    if (!result) break;
    result = (result as Record<string, unknown>)[key];
  }

  if (typeof result !== "string") {
    return theme.colors.semantic.text.default;
  }

  return result;
};

export const Typography = <T extends AsProp = "span">({
  children,
  typo,
  color = "semantic.text.default",
  as,
  ...props
}: TypographyProps<T>) => {
  const theme = useTheme();
  const Component = (as || "span") as ElementType;

  return (
    <Component
      css={css({
        color: getColorFromTheme(theme, color),
        ...theme.typography[typo],
      })}
      {...props}
    >
      {children}
    </Component>
  );
};
