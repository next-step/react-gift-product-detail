import styled from "@emotion/styled";
import type React from "react";

interface ErrorMsgProps {
  children: React.ReactNode;
}
const ErrorMessage = ({ children }: ErrorMsgProps) => {
  return <Style>{children}</Style>;
};

export default ErrorMessage;

const Style = styled.p`
  width: 100%;
  text-align: left;
  font: ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.color.stateColor.critical};
  padding: 0.1rem 0.2rem;
`;
