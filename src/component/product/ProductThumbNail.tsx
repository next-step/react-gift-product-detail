import { SideBlankDiv, Title } from "@/styles/Common.styled"
import { BrandDiv, BrandLogo, BrandLogoP, ProductImage } from "./ProductThumbNail.styled"
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFromUrl } from "@/utils/getFromUrl";
import type { ProductItem } from "@/type/GiftAPI/product";
import { Gap, GapGray } from "@/styles/CommomStyle/Common.styled";
import { getProductsUrl } from "@/utils/getApiUrl";
const ProductThumbNail = () => {
    const { productId } = useParams<{ productId: string }>();
    const productUrl = getProductsUrl(productId);
    const { data } = useQuery<ProductItem>({
        queryKey: ['productData'],
        queryFn: () => getFromUrl(productUrl)

    })

    return (
        <section>
            <ProductImage src={data?.imageURL} />
            <Gap height={20} />
            <SideBlankDiv>
                <Title>
                    {data?.name}

                </Title>
                <Gap height={8} />
                <Title>
                    {data?.price.sellingPrice}
                    <span style={{ fontWeight: 400 }}>원</span>
                </Title>
            </SideBlankDiv>
            <Gap height={16} />
            <GapGray height={1} />
            <Gap height={16} />
            
            <SideBlankDiv>
                <BrandDiv>
                    <BrandLogo src={data?.brandInfo.imageURL} />
                    <BrandLogoP>{data?.brandInfo.name}</BrandLogoP>
                </BrandDiv>
            </SideBlankDiv>
            
            <Gap height={16} />
            <GapGray height={8} />
        </section >
    )
}

export default ProductThumbNail
