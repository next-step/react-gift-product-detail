import { useParams } from "react-router-dom";

import { useGetProductDetailByProductId } from "@/features/product/services/getProductDetailByProductId";

import * as Styles from "./ProductInfoTab.styled";

export const ProductInfoTab = () => {
    const params = useParams();
    const productId = Number(params.id);
    const { data } = useGetProductDetailByProductId(productId);

    return (
        <Styles.Container
            dangerouslySetInnerHTML={{
                __html: data.description,
            }}
        />
    );
};
