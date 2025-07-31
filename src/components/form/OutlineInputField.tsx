import styled from "@emotion/styled";
import type { ComponentPropsWithoutRef } from "react";
import ErrorMessage from "@/components/error/ErrorMessage";

interface OutlineInputFieldProps extends ComponentPropsWithoutRef<"input"> {
  errorMsg: string | undefined;
}

const OutlineInputField = ({ errorMsg, ...props }: OutlineInputFieldProps) => {
  return (
    <Wrapper>
      <Input errorMsg={errorMsg} {...props} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </Wrapper>
  );
};

export default OutlineInputField;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input<OutlineInputFieldProps>`
  box-sizing: border-box;
  width: 100%;
  min-height: 2.75rem;
  border: 1px solid ${({ theme, errorMsg }) => (!!errorMsg ? theme.color.stateColor.critical : theme.color.gray600)};
  border-radius: 0.5rem;
  font: ${({ theme }) => theme.typography.body1Regular};
  padding: ${({ theme }) => `${theme.spacing.spacing1} ${theme.spacing.spacing3}`};
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.gray900};
  }
`;
