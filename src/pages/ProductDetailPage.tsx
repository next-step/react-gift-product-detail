import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/hooks/useProductInfo';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useProductWish } from '@/hooks/useProductWish';
import { useHighlightReview } from '@/hooks/useHighlightReview';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isPending: isProductPending,
    isError: isProductError,
  } = useProductInfo(productId);

  const {
    data: detail,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useProductDetail(productId);

  const {
    data: wish,
    isPending: isWishPending,
    isError: isWishError,
  } = useProductWish(productId);

  const {
    data: review,
    isPending: isReviewPending,
    isError: isReviewError,
  } = useHighlightReview(productId);

  if (isProductPending || isDetailPending || isWishPending || isReviewPending)
    return <p>로딩 중...</p>;
  if (isProductError || isDetailError || isWishError || isReviewError)
    return <p>에러 발생</p>;

  if (!product || !detail) return <p>데이터 없음</p>;

  return (
    <div>
      <h2>상품 상세</h2>
      <img src={product.imageURL} alt={product.name} width={200} />
      <p>상품명: {product.name}</p>
      <p>가격: {product.price.sellingPrice.toLocaleString()}원</p>
      <p>브랜드: {product.brandInfo.name}</p>

      <hr />
      <p>찜 수: {wish?.wishCount}</p>

      <hr />
      <h3>상품 설명</h3>
      <div dangerouslySetInnerHTML={{ __html: detail.description }} />

      <h4>공지사항</h4>
      <ul>
        {(detail.announcements ?? []).map((item, idx) => (
          <li key={idx} style={{ marginBottom: '1rem' }}>
            <strong>{item.name}</strong>
            <div style={{ whiteSpace: 'pre-line', marginTop: '0.25rem' }}>
              {item.value}
            </div>
          </li>
        ))}
      </ul>

      <hr />
      <h4>리뷰</h4>
      <p>총 리뷰 수: {review.totalCount}</p>
      <ul>
        {(review.reviews ?? []).map((item, idx) => (
          <li key={idx} style={{ marginBottom: '1rem' }}>
            <strong>{item.authorName}</strong>
            <div style={{ whiteSpace: 'pre-line', marginTop: '0.25rem' }}>
              {item.content}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetailPage;
