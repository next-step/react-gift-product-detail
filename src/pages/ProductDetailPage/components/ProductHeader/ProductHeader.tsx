import {
  ProductDetailContainer,
  ProductImage,
  ProductInfoContainer,
  ProductName,
  ProductPrice,
  ProductPriceUnit,
  Divider,
  BrandInfoContainer,
  BrandImage,
  BrandName,
} from "./ProductHeader.styles";
import type { ThemeProduct } from "@/types/ThemeProducts";

function ProductHeader({ data }: { data: ThemeProduct }) {
  return (
    <ProductDetailContainer>
      <ProductImage src={data.imageURL} alt={data.name} />
      <ProductInfoContainer>
        <ProductName>{data.name}</ProductName>
        <ProductPrice>
          {data.price.sellingPrice}
          <ProductPriceUnit>원</ProductPriceUnit>
        </ProductPrice>
      </ProductInfoContainer>
      <Divider />
      <BrandInfoContainer>
        <BrandImage src={data.brandInfo.imageURL} alt={data.brandInfo.name} />
        <BrandName>{data.brandInfo.name}</BrandName>
      </BrandInfoContainer>
    </ProductDetailContainer>
  );
}

export default ProductHeader;
