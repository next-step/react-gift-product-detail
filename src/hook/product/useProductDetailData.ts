import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFromUrl } from "@/utils/getFromUrl";
import { ProductDetailType, type ProductDetailInfo } from "@/type/GiftAPI/product";
import { getProductsDetailUrl } from '@/utils/getApiUrl';



function useProductDetailData() {

    const [DetailType, setDetailType] = useState<ProductDetailType>(ProductDetailType.description);
    const { productId } = useParams<{ productId: string }>();
    const productDetailUrl = getProductsDetailUrl(productId);
    const { data } = useSuspenseQuery<ProductDetailInfo>({
        queryKey: ['ProductDetailData'],
        queryFn: () => getFromUrl(productDetailUrl)

    })


    return {
        data,
        DetailType,
        setDetailType,
    }
};


export default useProductDetailData