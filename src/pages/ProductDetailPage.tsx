/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useState } from 'react';
import {
  useProductInfo,
  useProductDetail,
  useHighlightReview,
  useWishInfo,
} from '../apis/product_detail';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

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
        <p css={brand}>{product.brandInfo.name}</p>
        <p css={price}>{product.price.sellingPrice.toLocaleString()}원</p>
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
              <li key={r.id}>{r.content}</li>
            ))}
          </ul>
        )}
        {activeTab === 'DETAIL' && (
          <ul>
            {detail.announcements.map((a) => (
              <li key={a.name}>
                <strong>{a.name}</strong>: {a.value}
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

// 스타일
const containerStyle = css`
  max-width: 768px;
  margin: 0 auto;
  padding: 24px;
`;

const loadingStyle = css`
  padding: 40px;
  text-align: center;
  color: #666;
`;

const errorStyle = css`
  padding: 40px;
  text-align: center;
  color: red;
`;

const productImage = css`
  width: 100%;
  height: auto;
  max-height: none;
  object-fit: contain;
  border-radius: 12px;
`;

const infoSection = css`
  margin-top: 24px;
  margin-bottom: 32px;
`;

const productName = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const brand = css`
  font-size: 14px;
  color: #777;
  margin-bottom: 4px;
`;

const price = css`
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

const tabContainer = css`
  display: flex;
  justify-content: space-around;
  margin: 24px 0 16px;
  border-bottom: 1px solid #eee;
`;

const tabButton = css`
  flex: 1;
  padding: 12px 0;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  transition: color 0.2s;
`;

const activeTabStyle = css`
  color: #000;
  font-weight: bold;
  border-bottom: 2px solid #000;
`;

const tabContent = css`
  font-size: 14px;
  line-height: 1.6;
  padding-bottom: 24px;

  ul {
    padding-left: 20px;
    list-style: disc;

    li {
      margin-bottom: 8px;
    }
  }

  strong {
    font-weight: 600;
  }
`;

const bottomActionSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid #eee;
`;

const wishButton = css`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

const orderButton = css`
  background: #feda00;
  color: #000;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;
