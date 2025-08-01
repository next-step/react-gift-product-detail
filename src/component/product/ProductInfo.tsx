import { useParams } from 'react-router-dom';
import { getProductsDetailUrl } from "@/constant/api"
import { useQuery } from "@tanstack/react-query";
import { getFromUrl } from "@/utils/getFromUrl";
import type { ProductDetailInfo } from "@/type/GiftAPI/product";
import { NameText, DescriptionText } from './ProductDetail.styled';
import { Gap } from '@/styles/CommomStyle/Common.styled';



const ProductInfo = () => {
    const { productId } = useParams<{ productId: string }>();
    const productDetailUrl = getProductsDetailUrl(productId);
    const { data } = useQuery<ProductDetailInfo>({
        queryKey: ['ProductDetailData'],
        queryFn: () => getFromUrl(productDetailUrl)

    })
    console.log(data)

    return (
        <section>
            {data?.announcements.map(({ name, value, displayOrder }) => (
                <div key={name}>
                    <Gap height={16} />
                    <NameText>{name}</NameText>
                    <Gap height={8} />
                    <DescriptionText>{value}</DescriptionText>
                    <Gap height={8} />
                </div>
            ))}

        </section>
    )
}

export default ProductInfo
