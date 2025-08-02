import { DetailTypeOption, ProductDetailType } from '@/type/GiftAPI/product';
import { DetailOption, DetailOptionButton, DetailOptionText, HighLightLine, PrdocutDescriptionDiv } from './ProductDetail.styled';
import ProductInfo from './ProductInfo';
import { Gap } from '@/styles/CommomStyle/Common.styled';
import useProductDetailData from '@/hook/product/useProductDetailData';
import ProductReview from './ProductReview';
const ProductDetail = () => {
    const {data, DetailType, setDetailType,} = useProductDetailData();

    return (
        <section>
            <DetailOption>
                {DetailTypeOption.map(({ type, text }) => (
                    <DetailOptionButton key={text} onClick={() => setDetailType(type)}>
                        <DetailOptionText activate={DetailType === type}>
                            {text}
                        </DetailOptionText>
                        {(DetailType === type) ? <HighLightLine /> : null}
                    </DetailOptionButton>
                ))}
            </DetailOption>
            <div style={{ padding: '1rem' }}>
                {(DetailType === ProductDetailType.description) && data?.description &&
                    <PrdocutDescriptionDiv
                        dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                }

                {(DetailType === ProductDetailType.review) && data?.description &&
                    <ProductReview />
                }

                {(DetailType === ProductDetailType.info) && data?.description &&
                    <ProductInfo />
                }
            </div>

            <Gap height={64} />

        </section>
    )
}

export default ProductDetail
