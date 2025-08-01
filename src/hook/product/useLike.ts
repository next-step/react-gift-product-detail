import { getProductsWishUrl } from "@/constant/api";
import theme from "@/styles/theme";
import type { ProductWish } from "@/type/GiftAPI/product";
import { getFromUrl } from "@/utils/getFromUrl";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function useLike(){
    const { productId } = useParams<{ productId: string }>();
    const productWishUrl = getProductsWishUrl(productId);
    const {data} = useQuery<ProductWish>({
        queryKey : ['productWish',productId],
        queryFn : () => getFromUrl(productWishUrl)
    })

    const [isWished, setIsWished] = useState(data?.isWished);
    const [wishCount, setWishCount] = useState(data?.wishCount);
    useEffect(() => {
    if (data) {
      setIsWished(data.isWished);
      setWishCount(data.wishCount);
    }
    }, [data]);
    
    //const isWished = data?.isWished
    //const wishCount = isWished? data?.wishCount + 1 : data?.wishCount;

    const handleClick = () =>{
        if(isWished){
            setIsWished(false);
            setWishCount((prev) => (prev ?? 0) - 1);
        }else{
            setIsWished(true);
            setWishCount((prev) => (prev ?? 0) + 1);

        }
    }
    return ({
        wishCount,
        isWished,
        handleClick
    })
}

export default useLike
