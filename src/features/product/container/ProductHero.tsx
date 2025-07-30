import { useParams } from "react-router-dom";

import { useGetProduct } from "@/features/product/services/getProduct";

import * as Styles from "./ProductHero.styled";

export const ProductHero = () => {
    const params = useParams();
    const productId = Number(params.id);
    const product = useGetProduct(productId);

    return (
        <Styles.Container>
            <Styles.ProductImage src={product[0].data.imageURL} />
            <Styles.ProductInfo>
                <Styles.ProductName>{product[0].data.name}</Styles.ProductName>
                <Styles.PriceInfo>
                    {product[0].data.price.sellingPrice.toLocaleString()}원
                </Styles.PriceInfo>
            </Styles.ProductInfo>

            <Styles.BrandInfoContainer>
                <Styles.BrandImage src={product[0].data.brandInfo.imageURL}></Styles.BrandImage>
                <Styles.BrandName>{product[0].data.brandInfo.name}</Styles.BrandName>
            </Styles.BrandInfoContainer>
        </Styles.Container>
    );
};
