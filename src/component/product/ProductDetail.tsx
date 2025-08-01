import { useState } from 'react'
import { DetailTypeOption, ProductDetailType } from '@/type/GiftAPI/product';
import { DetailOption, DetailOptionButton, DetailOptionText, HighLightLine, PrdocutDescriptionDiv } from './ProductDetail.styled';
import { useParams } from 'react-router-dom';
import { getProductsDetailUrl } from "@/constant/api"
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFromUrl } from "@/utils/getFromUrl";
import type { ProductDetailInfo } from "@/type/GiftAPI/product";
import ProductRiew from './ProductRiew';
import ProductInfo from './ProductInfo';
import { Gap } from '@/styles/CommomStyle/Common.styled';
const ProductDetail = () => {
    const [DetailType, setDetailType] = useState<ProductDetailType>(ProductDetailType.description);
    const { productId } = useParams<{ productId: string }>();
    const productDetailUrl = getProductsDetailUrl(productId);
    const { data } = useSuspenseQuery<ProductDetailInfo>({
        queryKey: ['ProductDetailData'],
        queryFn: () => getFromUrl(productDetailUrl)

    })


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
                    <ProductRiew />
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
