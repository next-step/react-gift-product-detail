import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFromUrl } from "@/utils/getFromUrl";
import { getProductsUrl } from "@/utils/getApiUrl";
import type { ProductItem } from "@/type/GiftAPI/product";



function useProductThumbnail() {

    const { productId } = useParams<{ productId: string }>();
    const productUrl = getProductsUrl(productId);
    const { data } = useQuery<ProductItem>({
        queryKey: ['productData'],
        queryFn: () => getFromUrl(productUrl)

    })

    return {
        data
    }
};


export default useProductThumbnail