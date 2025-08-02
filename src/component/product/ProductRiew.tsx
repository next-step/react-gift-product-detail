import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getFromUrl } from "@/utils/getFromUrl";
import type { productHighlightReviewUrl } from "@/type/GiftAPI/product";
import { NameText, DescriptionText } from './ProductDetail.styled';
import { Gap } from '@/styles/CommomStyle/Common.styled';
import { getproductsHighlightReviewUrl } from '@/utils/getApiUrl';



const ProductRiew = () => {
    const { productId } = useParams<{ productId: string }>();
    const productHighlightReviewUrl = getproductsHighlightReviewUrl(productId);
    const { data } = useQuery<productHighlightReviewUrl>({
        queryKey: ['productHighlightReviewUrlData'],
        queryFn: () => getFromUrl(productHighlightReviewUrl)
    })
    return (
        <section>
            {data?.reviews.map(({ id, authorName, content }) => (
                <div key={id}>
                    <Gap height={16} />
                    <NameText>{authorName}</NameText>
                    <Gap height={8} />
                    <DescriptionText>{content}</DescriptionText>
                    <Gap height={8} />
                </div>
            ))}

        </section>
    )
}

export default ProductRiew
