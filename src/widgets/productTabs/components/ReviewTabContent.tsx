import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductHighlightReview } from '@/entities/product/api/productApi';
import { productQueryKeys } from '@/entities/product/api/queryKeys';
import type { ProductHighlightReview } from '@/entities/product/model/types';
import * as S from '../styles';

interface ReviewTabContentProps {
  productId: number;
}

const ReviewTabContent = ({ productId }: ReviewTabContentProps) => {
  const { data: reviewData } = useSuspenseQuery<ProductHighlightReview>({
    queryKey: productQueryKeys.highlightReview(productId),
    queryFn: () => getProductHighlightReview(productId),
  });

  return (
    <S.TabContent>
      <S.DetailContent>
        {reviewData?.reviews?.length ? (
          reviewData.reviews.map(review => (
            <S.DetailItem key={review.id}>
              <S.DetailName>{review.authorName}</S.DetailName>
              <S.DetailValue>{review.content}</S.DetailValue>
            </S.DetailItem>
          ))
        ) : (
          <S.ContentPlaceholder />
        )}
      </S.DetailContent>
    </S.TabContent>
  );
};

export default ReviewTabContent;
