import styled from "@emotion/styled";
import { type ComponentPropsWithoutRef } from "react";
import ErrorMessage from "../error/ErrorMessage";

interface TextareaInputFieldProps extends ComponentPropsWithoutRef<"textarea"> {
  errorMsg?: string | null;
}
const TextAreaInputField = ({ errorMsg = null, ...rest }: TextareaInputFieldProps) => {
  return (
    <Wrapper>
      <Input errorMsg={errorMsg} {...rest} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </Wrapper>
  );
};

export default TextAreaInputField;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.textarea<TextareaInputFieldProps>`
  width: 100%;
  max-width: 42.5rem;
  height: 5rem;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.spacing4};
  font: ${({ theme }) => theme.typography.body1Regular};
  border: 1px solid
    ${({ theme, errorMsg }) => (errorMsg !== null ? theme.color.stateColor.critical : theme.color.gray600)};
  border-radius: 0.5rem;
  outline: none;
  resize: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.gray900};
  }
`;
