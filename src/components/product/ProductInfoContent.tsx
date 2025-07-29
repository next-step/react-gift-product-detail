import { useProductInfo } from '@/hooks/useProduct';

import {
  ProductImage,
  ProductName,
  ProductPrice,
  BrandWrapper,
  BrandImage,
  BrandName,
} from '@/components/product/ProductInfoContent.style';
import Gap from '@/components/common/Gap.style';

interface ProductDetailInfoProps {
  productId: number;
}

const ProductInfoContent = ({ productId }: ProductDetailInfoProps) => {
  const { data } = useProductInfo(productId);

  return (
    <>
      <ProductImage src={data.imageURL} alt={data.name} />
      <Gap height={20} />
      <ProductName>{data.name}</ProductName>
      <Gap height={8} />
      <ProductPrice>{data.price.sellingPrice.toLocaleString()}원</ProductPrice>
      <Gap height={16} />
      <BrandWrapper>
        <BrandImage src={data.brandInfo.imageURL} alt={data.name} />
        <BrandName>{data.brandInfo.name}</BrandName>
      </BrandWrapper>
      <Gap height={24} />
    </>
  );
};

export default ProductInfoContent;
