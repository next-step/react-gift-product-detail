import { useSuspenseQuery } from '@tanstack/react-query';
import { productDetailQueryOptions } from '@/hooks/useProduct';

import {
  ReviewWrapper,
  ReviewItem,
  AuthorName,
  Content,
} from '@/components/product/ProductReview.style';
import Gap from '@/components/common/Gap.style';

interface ProductDetailInfoProps {
  productId: number;
}

const ProductDetailInfo = ({ productId }: ProductDetailInfoProps) => {
  const { data } = useSuspenseQuery(productDetailQueryOptions(productId));

  return (
    <ReviewWrapper>
      {data.announcements.map((announcements) => (
        <ReviewItem key={`${productId}-${announcements.displayOrder}`}>
          <AuthorName>{announcements.name}</AuthorName>
          <Gap height={8} />
          <Content>{announcements.value}</Content>
          <Gap height={24} />
        </ReviewItem>
      ))}
    </ReviewWrapper>
  );
};

export default ProductDetailInfo;
