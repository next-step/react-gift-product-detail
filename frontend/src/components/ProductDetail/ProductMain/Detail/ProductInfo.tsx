import {
  InfoName,
  InfoWrapper,
  ProductInfoWrapper,
} from '@/components/ProductDetail/ProductMain/Detail/ProductInfo.style.ts';
import type { ProductDetailInfoProps } from '@/types/products/detail/infoTypes.ts';

export default function ProductInfo({ announcements }: ProductDetailInfoProps) {
  const sorted = [...announcements].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <ProductInfoWrapper>
      {sorted.map((item) => (
        <InfoWrapper key={item.name}>
          <InfoName>{item.name}</InfoName>
          <div>{item.value}</div>
        </InfoWrapper>
      ))}
    </ProductInfoWrapper>
  );
}
