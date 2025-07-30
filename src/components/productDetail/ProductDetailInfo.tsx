import type { ProductType } from "@/types";
import styled from "@emotion/styled";

const ProductDetailInfoSection = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.color.gray[0],
}));

const ProductImage = styled.img({
  objectFit: "cover",
  width: "100%",
});

const ProductDescription = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing4,
}));

const ProductTitle = styled.h3(({ theme }) => ({
  fontSize: `${theme.typography.title1Bold.fontSize}`,
  fontWeight: `${theme.typography.title1Bold.fontWeight}`,
  lineHeight: `${theme.typography.title1Bold.lineHeight}`,
  color: `${theme.color.gray[900]}`,
}));

const ProductPrice = styled.p(({ theme }) => ({
  fontSize: `${theme.typography.title1Bold.fontSize}`,
  fontWeight: `${theme.typography.title1Bold.fontWeight}`,
  lineHeight: `${theme.typography.title1Bold.lineHeight}`,
  color: `${theme.color.gray[900]}`,
}));

const ProductBrand = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexDirection: "row",
  borderTop: `1px solid ${theme.color.gray[300]}`,
  padding: theme.spacing4,
}));

const ProductBrandImage = styled.img({
  objectFit: "contain",
  borderRadius: "100%",
  width: "32px",
  height: "32px",
});

const ProductBrandName = styled.p(({ theme }) => ({
  fontSize: theme.typography.body1Regular.fontSize,
  fontWeight: theme.typography.body1Regular.fontWeight,
  lineHeight: theme.typography.body1Regular.lineHeight,
  color: theme.color.gray[900],
}));

interface ProductDetailInfoProps {
  productInfo: ProductType;
}

export const ProductDetailInfo = ({ productInfo }: ProductDetailInfoProps) => {
  return (
    <ProductDetailInfoSection>
      <ProductImage src={productInfo.imageURL} alt={productInfo.name} />
      <ProductDescription>
        <ProductTitle>{productInfo.name}</ProductTitle>
        <ProductPrice>{productInfo.price.sellingPrice}원</ProductPrice>
      </ProductDescription>
      <ProductBrand>
        <ProductBrandImage
          src={productInfo.brandInfo.imageURL}
          alt="브랜드 이미지"
        />
        <ProductBrandName>{productInfo.brandInfo.name}</ProductBrandName>
      </ProductBrand>
    </ProductDetailInfoSection>
  );
};
