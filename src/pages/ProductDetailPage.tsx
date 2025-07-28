import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout';
import { ROUTE_HOME } from '@/constants';
import {
  useProductBasic,
  useProductDetail,
  useProductWish,
  useProductHighlightReview,
} from '@/api/product/query';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  if (!productId) {
    navigate(ROUTE_HOME);
    return null;
  }

  // API 테스트
  const {
    data: productBasic,
    isLoading: isLoadingBasic,
    error: errorBasic,
  } = useProductBasic(productId);
  const {
    data: productDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useProductDetail(productId);
  const {
    data: productWish,
    isLoading: isLoadingWish,
    error: errorWish,
  } = useProductWish(productId);
  const {
    data: productReview,
    isLoading: isLoadingReview,
    error: errorReview,
  } = useProductHighlightReview(productId);

  const isLoading =
    isLoadingBasic || isLoadingDetail || isLoadingWish || isLoadingReview;
  const hasError = errorBasic || errorDetail || errorWish || errorReview;

  if (isLoading) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>상품 정보를 불러오는 중...</h1>
        </div>
      </Container>
    );
  }

  if (hasError) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>상품 정보를 불러오지 못했습니다.</h1>
          <p>상품 ID: {productId}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ padding: '20px' }}>
        <h1>상품 상세 페이지</h1>
        <p>상품 ID: {productId}</p>

        {/* 상품 기본 정보 */}
        {productBasic && (
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h2>상품 기본 정보</h2>
            <p>
              <strong>상품명:</strong> {productBasic.data.name}
            </p>
            <p>
              <strong>브랜드:</strong> {productBasic.data.brandInfo.name}
            </p>
            <p>
              <strong>가격:</strong>{' '}
              {productBasic.data.price.sellingPrice.toLocaleString()}원
            </p>
          </div>
        )}

        {/* 상품 상세 정보 */}
        {productDetail && (
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h2>상품 상세 정보</h2>
            <p>
              <strong>설명:</strong> {productDetail.data.description}
            </p>
            <h3>공지사항:</h3>
            <ul>
              {productDetail.data.announcements.map((announcement, index) => (
                <li key={index}>
                  <strong>{announcement.name}:</strong> {announcement.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 찜 정보 */}
        {productWish && (
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h2>찜 정보</h2>
            <p>
              <strong>찜 수:</strong> {productWish.data.wishCount}개
            </p>
            <p>
              <strong>내가 찜했는지:</strong>{' '}
              {productWish.data.isWished ? '예' : '아니오'}
            </p>
          </div>
        )}

        {/* 리뷰 정보 */}
        {productReview && (
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h2>리뷰 정보</h2>
            <p>
              <strong>총 리뷰 수:</strong> {productReview.data.totalCount}개
            </p>
            <h3>하이라이트 리뷰:</h3>
            {productReview.data.reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                }}
              >
                <p>
                  <strong>{review.authorName}:</strong>
                </p>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        )}

        <p style={{ color: '#666', marginTop: '20px' }}>구현 예정...</p>
      </div>
    </Container>
  );
};

export default ProductDetailPage;
