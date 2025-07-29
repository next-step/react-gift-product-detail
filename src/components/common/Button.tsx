import styled from "@emotion/styled";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "icon";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  fullHeight?: boolean;
  round?: boolean;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <Style {...props}>{children}</Style>;
};

const Style = styled.button<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  fullHeight?: boolean;
  round?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard", sans-serif;
  cursor: ${({ disabled = false }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
  border-radius: ${({ round = false }) => (round ? "4px" : "0")};
  ${({ disabled = false }) => disabled && "opacity: 0.5;"}
  transition: 0.2s;

  ${({ size = "medium", theme }) => {
    switch (size) {
      case "small":
        return `
            min-height: 1.875rem;
            padding: ${theme.spacing.spacing2};
        `;
      case "medium":
        return `
            min-height: 2.75rem;
            padding: ${theme.spacing.spacing3};
        `;
      case "large":
        return `
            min-height: 3.625rem;
            padding: ${theme.spacing.spacing4};
        `;
    }
  }};

  ${({ variant = "primary", theme }) => {
    switch (variant) {
      case "primary":
        return `
                width: 25rem;
                background-color: ${theme.color.kakaoYellow};
                color: ${theme.color.gray800};
                font: ${theme.typography.body1Regular};

                &:hover:not(:disabled) {
                    background-color: ${theme.color.kakaoYellowHover};
                }
                &:active:not(:disabled) {
                    background-color: ${theme.color.kakaoYellowActive};
                }
            `;
      case "secondary":
        return `
                width: 25rem;
                background-color: ${theme.color.backgroundColor.default};
                color: ${theme.color.gray800};
                font: ${theme.typography.body1Regular};
                border: 1px solid ${theme.color.gray400};

                &:hover:not(:disabled) {
                    background-color: ${theme.color.gray100};
                }
                &:active:not(:disabled) {
                    background-color: ${theme.color.gray500};
                }
            `;
      case "icon":
        return `
                background-color: transparent;
                font: ${theme.typography.body1Bold};
            `;
    }
  }};

  ${({ fullWidth = false }) => fullWidth && "width: 100%;"}
  ${({ fullHeight = false }) => fullHeight && "height: 100%;"}
`;

export default Button;
