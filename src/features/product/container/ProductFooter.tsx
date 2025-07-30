import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";

import { Heart } from "lucide-react";

import { useToggleProductWish } from "@/features/product/services/addProductToWish";
import { useGetProductWishByProductId } from "@/features/product/services/getProductWishByProductId";

import * as Styles from "./ProductFooter.styled";

export const ProductFooter = () => {
    const navigate = useNavigate();
    const params = useParams();
    const productId = Number(params.id);

    const { data: wishData } = useGetProductWishByProductId(productId);
    const toggleWishMutation = useToggleProductWish(productId);

    const handleWishToggle = () => {
        toggleWishMutation.mutate();
    };

    return createPortal(
        <Styles.Footer>
            <Styles.WishButton onClick={handleWishToggle} disabled={toggleWishMutation.isPending}>
                <Heart
                    size={16}
                    fill={wishData.isWished ? "#ff0000" : "none"}
                    color={wishData.isWished ? "none" : "#ff0000"}
                />
                <Styles.WishCount>{wishData.wishCount}</Styles.WishCount>
            </Styles.WishButton>

            <Styles.OrderButton onClick={() => navigate(`/order/${productId}`)}>
                주문하기
            </Styles.OrderButton>
        </Styles.Footer>,
        document.body as HTMLElement,
    );
};
