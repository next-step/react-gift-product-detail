import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getFromUrl } from "@/utils/getFromUrl";
import type { productHighlightReviewUrl } from '@/type/GiftAPI/product';
import { getproductsHighlightReviewUrl } from '@/utils/getApiUrl';



function useProductReview() {

    const { productId } = useParams<{ productId: string }>();
    const productHighlightReviewUrl = getproductsHighlightReviewUrl(productId);
    const { data } = useQuery<productHighlightReviewUrl>({
        queryKey: ['productHighlightReviewUrlData'],
        queryFn: () => getFromUrl(productHighlightReviewUrl)
    })

    return {
        data
    }
};


export default useProductReview