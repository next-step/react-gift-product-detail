import type { ProductInfoSummary } from "@/types/ProductInfoSummary";
import { PRODUCT_INFO_CONSTANTS } from "../../constants/productInfo";
import {
  ProductSection,
  ProductContainer,
  ProductImage,
  ProductDetails,
  PriceContainer,
  OrderButtonContainer,
  OrderButton,
} from "./ProductInfo.styles";
import { Typography } from "@/components/Typography/Typography";

interface ProductInfoProps {
  product: ProductInfoSummary;
  quantity: string;
}

function ProductInfo({ product, quantity }: ProductInfoProps) {
  const totalPrice = product.price * parseInt(quantity, 10);

  return (
    <>
      <ProductSection>
        <Typography variant="title2Bold" as="h2" color="default">
          {PRODUCT_INFO_CONSTANTS.TITLE}
        </Typography>
        <ProductContainer>
          <ProductImage src={product.imageURL} alt={product.name} />
          <ProductDetails>
            <Typography variant="body2Regular" as="h3" color="default">
              {product.name}
            </Typography>
            <Typography variant="label2Regular" as="p" color="sub">
              {product.brandName}
            </Typography>
            <PriceContainer>
              <Typography variant="body2Regular" as="span" color="sub">
                {PRODUCT_INFO_CONSTANTS.PRICE_LABEL}
              </Typography>
              <Typography variant="title2Bold" as="span" color="default">
                {product.price.toLocaleString()}
                {PRODUCT_INFO_CONSTANTS.WON}
              </Typography>
            </PriceContainer>
          </ProductDetails>
        </ProductContainer>
      </ProductSection>
      <OrderButtonContainer>
        <OrderButton type="submit">
          {totalPrice.toLocaleString()}
          {PRODUCT_INFO_CONSTANTS.WON}{" "}
          {PRODUCT_INFO_CONSTANTS.ORDER_BUTTON_LABEL}
        </OrderButton>
      </OrderButtonContainer>
    </>
  );
}

export default ProductInfo;
