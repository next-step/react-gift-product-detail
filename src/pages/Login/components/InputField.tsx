import styled from "@emotion/styled";
import type { ComponentPropsWithoutRef } from "react";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  errorMsg: string | null;
}

const InputField = ({ errorMsg, ...rest }: InputFieldProps) => {
  return (
    <InputWrapper>
      <Input errorMsg={errorMsg} {...rest} />
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </InputWrapper>
  );
};

export default InputField;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing1};
`;

type InputType = {
  errorMsg: string | null;
};
const Input = styled.input<InputType>`
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
const ErrorMsg = styled.p`
  width: 100%;
  text-align: left;
  font: ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.color.stateColor.critical};
  min-height: 1rem;
`;
