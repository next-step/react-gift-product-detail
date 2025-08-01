/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import type { PropsWithChildren } from "react";

const StyledText = styled.p`
  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
`;

const Typography = ({ children }: PropsWithChildren) => {
  return <StyledText>{children}</StyledText>;
};

export default Typography;
