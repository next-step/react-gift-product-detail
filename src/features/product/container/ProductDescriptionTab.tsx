import { useParams } from "react-router-dom";

import { useGetProductDetailByProductId } from "@/features/product/services/getProductDetailByProductId";

import * as Styles from "./ProductDescriptionTab.styled";

export const ProductDescriptionTab = () => {
    const params = useParams();
    const productId = Number(params.id);

    const { data } = useGetProductDetailByProductId(productId);

    return (
        <Styles.Container>
            {data.announcements.map((item) => {
                return (
                    <Styles.ItemContainer key={item.name}>
                        <Styles.ItemName>{item.name}</Styles.ItemName>
                        <Styles.ItemValue>{item.value}</Styles.ItemValue>
                    </Styles.ItemContainer>
                );
            })}
        </Styles.Container>
    );
};
