import { useParams } from "react-router-dom";
import { useProductInfo } from "@src/hooks/useProductInfo";
import styled from "@emotion/styled";

function ProductCard() {
  const productId = useParams().id ?? "";
  const productInfo = useProductInfo(productId);

  return (
    <ProductCardWrapper>
      <CardImage
        style={{ width: "100%" }}
        src={productInfo.generalInfo.imageURL}
        alt="product image"
      />
      <VerticalLayout>
        <CardName>{productInfo.generalInfo.name}</CardName>
        <CardDescription>
          <strong>{productInfo.generalInfo.price.basicPrice}</strong>원
        </CardDescription>
      </VerticalLayout>
      <HorizontalLine />
      <HorizontalLayout>
        <BrandImage
          style={{ height: "100%" }}
          src={productInfo.generalInfo.brandInfo.imageURL}
          alt="product image"
        />
        <BrandName>{productInfo.generalInfo.brandInfo.name}</BrandName>
      </HorizontalLayout>
    </ProductCardWrapper>
  );
}

const HorizontalLine = styled.div`
  height: 2px;
`;

const CardImage = styled.img`
  width: 100%;
`;

const CardName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const CardDescription = styled.div`
  font-size: 20px;
`;

const BrandImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const BrandName = styled.div`
  font-size: 20px;
`;

const HorizontalLayout = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
`;

const VerticalLayout = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  background-color: white;
`;

const ProductCardWrapper = styled.div``;

export default ProductCard;
