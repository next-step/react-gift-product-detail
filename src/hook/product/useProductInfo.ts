import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFromUrl } from "@/utils/getFromUrl";
import { getProductsDetailUrl } from "@/utils/getApiUrl";
import type { ProductDetailInfo } from "@/type/GiftAPI/product";



function useProductInfo() {
    const { productId } = useParams<{ productId: string }>();
    const productDetailUrl = getProductsDetailUrl(productId);
    const { data } = useQuery<ProductDetailInfo>({
        queryKey: ['ProductDetailData'],
        queryFn: () => getFromUrl(productDetailUrl)

    })

    return {
        data
    }
};


export default useProductInfo