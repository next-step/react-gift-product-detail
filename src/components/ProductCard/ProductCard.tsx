import { useNavigate } from "react-router-dom";
import {
  ProductCardContainer,
  ProductImage,
  ProductInfo,
  ProductPrice,
  RankBadge,
} from "./ProductCard.styles";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constants/routes";
import {
  PRODUCT_GRID_TYPES,
  type ProductGridType,
} from "./types/productGridTypes";
import { Typography } from "@/components/Typography/Typography";

export interface ProductCardPropsType {
  id: number;
  imageURL: string;
  name: string;
  brandName: string;
  sellingPrice: number;
  index: number;
  type: ProductGridType;
}

function ProductCard({
  id,
  imageURL,
  name,
  brandName,
  sellingPrice,
  index,
  type,
}: ProductCardPropsType) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    const redirectPath = ROUTES.PRODUCT_DETAIL.replace(":id", id.toString());

    navigate(
      isLoggedIn
        ? redirectPath
        : `${ROUTES.LOGIN}?redirect=${encodeURIComponent(redirectPath)}`
    );
  };

  return (
    <ProductCardContainer onClick={handleClick} data-testid="grid-card">
      {type === PRODUCT_GRID_TYPES.TRENDING_GIFTS && (
        <RankBadge isTopThree={index < 3}>{index + 1}</RankBadge>
      )}
      <ProductImage src={imageURL} alt={name} data-testid="product-image" />
      <ProductInfo>
        <Typography
          variant="label1Regular"
          as="p"
          color="text-sub"
          data-testid="brand-name"
        >
          {brandName}
        </Typography>
        <Typography variant="label1Regular" as="h4" data-testid="product-name">
          {name}
        </Typography>
      </ProductInfo>
      <ProductPrice>
        <Typography
          variant="subtitle1Bold"
          as="span"
          data-testid="product-price"
        >
          {sellingPrice.toLocaleString()}
        </Typography>{" "}
        원
      </ProductPrice>
    </ProductCardContainer>
  );
}

export default ProductCard;
