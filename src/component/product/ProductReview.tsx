import useProductReview from '@/hook/product/useProductReview';
import { NameText, DescriptionText } from './ProductDetail.styled';
import { Gap } from '@/styles/CommomStyle/Common.styled';



const ProductReview = () => {

    const { data } = useProductReview();
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

export default ProductReview
