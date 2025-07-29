import { PRODUCT_DETAIL_LABELS } from "../../constants/labels";
import {
  ProductDetailContainer,
  ProductImage,
  ProductInfoContainer,
  ProductPrice,
  Divider,
  BrandInfoContainer,
  BrandImage,
} from "./ProductHeader.styles";
import type { ThemeProduct } from "@/types/ThemeProducts";
import { Typography } from "@/components/Typography/Typography";

function ProductHeader({ data }: { data: ThemeProduct }) {
  return (
    <ProductDetailContainer>
      <ProductImage src={data.imageURL} alt={data.name} />
      <ProductInfoContainer>
        <Typography variant="title1Bold" as="h1" color="default">
          {data.name}
        </Typography>
        <ProductPrice>
          <Typography variant="title1Bold" as="span" color="default">
            {data.price.sellingPrice}
          </Typography>
          <Typography variant="title1Regular" as="span" color="default">
            {PRODUCT_DETAIL_LABELS.PRICE_UNIT}
          </Typography>
        </ProductPrice>
      </ProductInfoContainer>
      <Divider />
      <BrandInfoContainer>
        <BrandImage src={data.brandInfo.imageURL} alt={data.brandInfo.name} />
        <Typography variant="body1Regular" as="p" color="default">
          {data.brandInfo.name}
        </Typography>
      </BrandInfoContainer>
    </ProductDetailContainer>
  );
}

export default ProductHeader;
