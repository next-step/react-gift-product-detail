import { NameText, DescriptionText } from './ProductDetail.styled';
import { Gap } from '@/styles/CommomStyle/Common.styled';
import useProductInfo from '@/hook/product/useProductInfo';



const ProductInfo = () => {

    const { data } = useProductInfo();

    return (
        <section>
            {data?.announcements.map(({ name, value }) => (
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
