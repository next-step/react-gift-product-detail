import { useParams } from "react-router-dom";

import { useGetProductReviewByProductId } from "@/features/product/services/getProductReviewByProductId";

import * as Styles from "./ProductReviewTab.styled";

export const ProductReviewTab = () => {
    const params = useParams();
    const productId = Number(params.id);
    const { data } = useGetProductReviewByProductId(productId);

    return (
        <Styles.Container>
            {data.reviews.map((review) => {
                return (
                    <ProductReviewItem authorName={review.authorName} content={review.content} />
                );
            })}
        </Styles.Container>
    );
};

/////////////////////////////////////////////////////////////////////////////////////

export interface ProductReviewItemProps {
    authorName: string;
    content: string;
}

export const ProductReviewItem = ({ authorName, content }: ProductReviewItemProps) => {
    return (
        <Styles.ItemContainer>
            <Styles.ItemAuthorName>{authorName}</Styles.ItemAuthorName>
            <Styles.ItemContent>{content}</Styles.ItemContent>
        </Styles.ItemContainer>
    );
};
