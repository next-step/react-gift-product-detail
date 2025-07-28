import { type ProductDetailResponseBody } from "@/api/product/types";
import styled from "@emotion/styled";

const ProductDetailDescriptionContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing4,
  backgroundColor: theme.color.gray[0],
}));

const ProductDetailDescriptionWrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: `${theme.spacing4} 0`,
  color: theme.color.gray[900],
}));

const ProductDetailDescriptionTitle = styled.h3(({ theme }) => ({
  fontSize: theme.typography.title2Bold.fontSize,
  fontWeight: theme.typography.title2Bold.fontWeight,
  lineHeight: theme.typography.title2Bold.lineHeight,
}));

const ProductDetailDescriptionContent = styled.p(({ theme }) => ({
  fontSize: theme.typography.body1Regular.fontSize,
  fontWeight: theme.typography.body1Regular.fontWeight,
  lineHeight: theme.typography.body1Regular.lineHeight,
}));

interface ProductDetailDescriptionProps {
  detail: ProductDetailResponseBody;
}

export const ProductDetailDescription = ({
  detail,
}: ProductDetailDescriptionProps) => {
  return (
    <ProductDetailDescriptionContainer>
      {detail?.announcements.map(d => (
        <ProductDetailDescriptionWrapper key={`${d.displayOrder}+${d.name}`}>
          <ProductDetailDescriptionTitle>
            {d.name}
          </ProductDetailDescriptionTitle>
          <ProductDetailDescriptionContent>
            {d.value}
          </ProductDetailDescriptionContent>
        </ProductDetailDescriptionWrapper>
      ))}
    </ProductDetailDescriptionContainer>
  );
};
