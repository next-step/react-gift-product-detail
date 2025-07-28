import styled from "@emotion/styled";
import type { ReactNode } from "react";

const ProductDetailLayout = styled.main(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: `${theme.color.gray[200]}`,
  minHeight: "100vh",
  paddingBottom: "40px",
}));

export const ProductDetailPageLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <ProductDetailLayout>{children}</ProductDetailLayout>;
};
