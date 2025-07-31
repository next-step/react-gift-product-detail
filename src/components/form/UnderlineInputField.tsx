import styled from "@emotion/styled";
import type { ComponentPropsWithoutRef } from "react";
import ErrorMessage from "@/components/error/ErrorMessage";

interface UnderlineInputFieldProps extends ComponentPropsWithoutRef<"input"> {
  errorMsg?: string | null;
  spacing?: string;
}

const UnderlineInputField = ({ errorMsg = null, spacing = "", ...rest }: UnderlineInputFieldProps) => {
  return (
    <Wrapper spacing={spacing}>
      <Input errorMsg={errorMsg} {...rest} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </Wrapper>
  );
};

export default UnderlineInputField;

const Wrapper = styled.div<UnderlineInputFieldProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ spacing }) => spacing};
`;

const Input = styled.input<UnderlineInputFieldProps>`
  width: 100%;
  min-height: 2.75rem;
  border: none;
  ${({ errorMsg, theme }) => {
    if (errorMsg === null) {
      return `border-bottom: 1px solid ${theme.color.borderColor.disabled};`;
    } else {
      return `border-bottom: 1px solid ${theme.color.stateColor.critical};`;
    }
  }}

  font: ${({ theme }) => theme.typography.subtitle1Regular};
  outline: none;
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray600};
  }
`;
