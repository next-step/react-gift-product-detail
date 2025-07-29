import { useParams } from 'react-router-dom';
import { useProductDetail } from '@/hooks/useProduct';

import {
  ReviewWrapper,
  ReviewItem,
  AuthorName,
  Content,
} from '@/components/product/ProductReview.style';
import Gap from '@/components/common/Gap.style';


const ProductDetailInfo = () => {
  const { productId } = useParams();
  const id = Number(productId);
  const { data } = useProductDetail(id);

  return (
    <ReviewWrapper>
      {data.announcements.map((announcements) => (
        <ReviewItem key={announcements.displayOrder}>
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
