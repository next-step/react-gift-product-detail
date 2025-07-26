/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  useProductInfo,
  useProductDetail,
  useHighlightReview,
  useWishInfo,
} from '../../apis/product_detail';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {
  containerStyle,
  loadingStyle,
  errorStyle,
  productImage,
  infoSection,
  productName,
  price,
  brand,
  brandImage,
  brandName,
  tabContainer,
  tabButton,
  activeTabStyle,
  tabContent,
  reviewAuthorStyle,
  bottomActionSection,
  wishButton,
  orderButton,
} from './styles';

const TAB = {
  DESCRIPTION: '상품설명',
  REVIEW: '선물후기',
  DETAIL: '상세정보',
} as const;

type TabKey = keyof typeof TAB;

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('DESCRIPTION');

  if (!productId) {
    return <div css={errorStyle}>상품 정보를 불러올 수 없습니다.</div>;
  }

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useProductInfo(productId);

  const {
    data: detail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useProductDetail(productId);

  const { data: review, isLoading: isLoadingReview } =
    useHighlightReview(productId);

  const { data: wish } = useWishInfo(productId);

  const [isWished, setIsWished] = useState(wish?.isWished ?? false);

  const toggleWish = () => {
    setIsWished((prev) => !prev);
  };

  if (isLoadingProduct || isLoadingDetail || isLoadingReview) {
    return <div css={loadingStyle}>불러오는 중...</div>;
  }

  if (isErrorProduct || isErrorDetail || !product || !detail) {
    return <div css={errorStyle}>상품 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <main css={containerStyle}>
      <img src={product.imageURL} alt={product.name} css={productImage} />

      <section css={infoSection}>
        <h1 css={productName}>{product.name}</h1>
        <p css={price}>{product.price.sellingPrice.toLocaleString()}원</p>
        <div css={brand}>
          <img
            src={product.brandInfo.imageURL}
            alt={product.brandInfo.name}
            css={brandImage}
          />
          <span css={brandName}>{product.brandInfo.name}</span>
        </div>
      </section>

      <section css={tabContainer}>
        {Object.entries(TAB).map(([key, label]) => (
          <button
            key={key}
            css={[tabButton, activeTab === key && activeTabStyle]}
            onClick={() => setActiveTab(key as TabKey)}
          >
            {label}
          </button>
        ))}
      </section>

      <section css={tabContent}>
        {activeTab === 'DESCRIPTION' && (
          <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        )}
        {activeTab === 'REVIEW' && review && (
          <ul>
            {review.reviews.map((r) => (
              <li key={r.id}>
                <p>
                  <strong css={reviewAuthorStyle}>{r.authorName}</strong>
                </p>
                <p>{r.content}</p>
              </li>
            ))}
          </ul>
        )}
        {activeTab === 'DETAIL' && (
          <ul>
            {detail.announcements.map((a) => (
              <li key={a.name}>
                <p>
                  <strong>{a.name}</strong>
                </p>
                <p>{a.value}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section css={bottomActionSection}>
        <button css={wishButton} onClick={toggleWish}>
          {isWished ? (
            <AiFillHeart size={24} color="red" />
          ) : (
            <AiOutlineHeart size={24} />
          )}
          <span>{wish?.wishCount.toLocaleString()}</span>
        </button>
        <button
          css={orderButton}
          onClick={() => navigate(`/order/${productId}`)}
        >
          주문하기
        </button>
      </section>
    </main>
  );
};

export default ProductDetailPage;
