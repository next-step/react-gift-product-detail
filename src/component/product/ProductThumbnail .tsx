import { SideBlankDiv, Title } from "@/styles/Common.styled"
import { BrandDiv, BrandLogo, BrandLogoP, ProductImage } from "./ProductThumbnail.styled";
import useProductThumbnail from "@/hook/product/useProductThumbnail";
import { Gap, GapGray } from "@/styles/CommomStyle/Common.styled";
const ProductThumbNail = () => {
    
    const { data } = useProductThumbnail();

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
