import type { ProductHighlightReview } from '@/apis/domain/products/type';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';

type Props = {
  reviews: ProductHighlightReview['reviews'];
};

export const ProductDetailReview = ({ reviews }: Props) => {
  return (
    <Wrapper>
      {reviews.map((review) => (
        <div key={review.id}>
          <HorizontalSpacing size='spacing4' />
          <Typography variant='subtitle2Bold'>{review.authorName}</Typography>
          <HorizontalSpacing size='spacing2' />
          <Typography
            variant='body1Regular'
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {review.content}
          </Typography>
          <HorizontalSpacing size='spacing2' />
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;
