import { parseHTMLContent } from "@/utils/parse-html";
import styled from "@emotion/styled";
import { useMemo } from "react";

const ProductDetailSummaryContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "400px",
  padding: theme.spacing4,
  backgroundColor: theme.color.gray[0],
  alignItems: "center",
}));

const ProductDetailImage = styled.img({
  maxWidth: "100%",
  height: "auto",
  display: "block",
});

const ProductDetailText = styled.p(({ theme }) => ({
  fontSize: theme.typography.body1Regular.fontSize,
  fontWeight: theme.typography.body1Regular.fontWeight,
  lineHeight: theme.typography.body1Regular.lineHeight,
  color: theme.color.gray[900],
}));

interface ProductDetailSummaryProps {
  description?: string;
}

export const ProductDetailSummary = ({
  description,
}: ProductDetailSummaryProps) => {
  const parsedContent = useMemo(() => {
    if (!description?.trim()) return null;

    return parseHTMLContent(description).map(item =>
      item.type === "image" ? (
        <ProductDetailImage key={item.key} src={item.content} alt="" />
      ) : (
        <ProductDetailText key={item.key}>{item.content}</ProductDetailText>
      ),
    );
  }, [description]);

  return (
    <ProductDetailSummaryContainer>
      {parsedContent}
    </ProductDetailSummaryContainer>
  );
};
