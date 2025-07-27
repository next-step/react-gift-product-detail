import React from 'react';
import type { ProductReview } from '../../types';
import * as S from './styles';

interface ReviewTabProps {
  review: ProductReview;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ review }) => {
  return (
    <S.Reviews>
      {review.reviews.map((reviewItem) => (
        <S.ReviewWrapper key={reviewItem.id}>
          <S.AuthorName>{reviewItem.authorName}</S.AuthorName>
          <S.ReviewContent>{reviewItem.content}</S.ReviewContent>
        </S.ReviewWrapper>
      ))}
    </S.Reviews>
  );
};

export default ReviewTab;
