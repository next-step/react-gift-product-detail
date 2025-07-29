/** @jsxImportSource @emotion/react */
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { useState, Suspense } from 'react';
import {
  useProductInfo,
  useProductDetail,
  useHighlightReview,
  useWishInfo,
} from '../../apis/detail';
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
  reviewContentStyle,
} from './styles';

import { ErrorBoundary } from '../../ErrorBoundary';
import { UserManagement } from '../Login/contexts/UserManagement'; // 추가

const TAB = {
  DESCRIPTION: '상품설명',
  REVIEW: '선물후기',
  DETAIL: '상세정보',
} as const;

type TabKey = keyof typeof TAB;

const ProductDetailContent = () => {
  const { productId } = useParams<{ productId: string }>();
  const [activeTab, setActiveTab] = useState<TabKey>('DESCRIPTION');

  const { user } = UserManagement();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  if (!productId) {
    return <div css={errorStyle}>상품 정보를 불러올 수 없습니다.</div>;
  }

  const { data: product } = useProductInfo(productId);
  const { data: detail } = useProductDetail(productId);
  const { data: review } = useHighlightReview(productId);
  useWishInfo(productId);

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
                <p css={reviewContentStyle}>{r.content}</p>
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
    </main>
  );
};

const ProductDetailPage = () => (
  <ErrorBoundary>
    <Suspense fallback={<div css={loadingStyle}>불러오는 중...</div>}>
      <ProductDetailContent />
    </Suspense>
  </ErrorBoundary>
);

export default ProductDetailPage;
