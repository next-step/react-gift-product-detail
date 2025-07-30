import useFetchProductData from '@/hooks/fetch/useFetchProductData.ts';
import {
  BrandImage,
  BrandWrapper,
  ProductHeadWrapper,
  ProductImage,
  ProductName,
  ProductPrice,
} from '@/components/ProductDetail/ProductHead.style.ts';

export default function ProductHead({ productId }: { productId: number }) {
  const { data } = useFetchProductData(productId);

  return (
    <>
      <ProductHeadWrapper>
        <ProductImage src={data.imageURL} alt={data.name} />
        <ProductName>{data.name}</ProductName>
        <ProductPrice>{data.price.sellingPrice}원</ProductPrice>
      </ProductHeadWrapper>
      <BrandWrapper>
        <BrandImage src={data.brandInfo.imageURL} alt={data.brandInfo.name} />
        <span>{data.brandInfo.name}</span>
      </BrandWrapper>
    </>
  );
}
