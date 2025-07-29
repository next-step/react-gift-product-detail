import { useParams } from 'react-router-dom';
import { useHighlightReview } from '@/hooks/useProduct';

import Gap from '@/components/common/Gap.style';
import {ReviewWrapper, ReviewItem, AuthorName, Content} from '@/components/product/ProductReview.style';

const ProductReview = () => {
  const { productId } = useParams();
  const id = Number(productId);
  const { data } = useHighlightReview(id);

  return (
    <ReviewWrapper>
      {data.reviews.map((review) => (
        <ReviewItem key={review.id}>
          <AuthorName>{review.authorName}</AuthorName>
          <Gap height={8} />
          <Content>{review.content}</Content>
          <Gap height={24} />
        </ReviewItem>
      ))}
    </ReviewWrapper>
  );
};

export default ProductReview;
