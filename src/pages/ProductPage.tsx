import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import GlobalStyle from '@/styles/GlobalStyle';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { useNavigate } from 'react-router-dom';
import {
  useProductBasicQuery,
  useProductDetailQuery,
  useProductWishQuery,
  useProductHighlightReviewQuery
} from '@/hooks/useProductDetailQueries'
import { Suspense } from 'react'
import Loading from '@/components/Common/Loading'


const tabList = ['상품설명', '선물후기', '상세정보'];

// 리스트 스타일
const listStyle = css({
  padding: 0,
  margin: 0,
  listStyle: 'none',
});
const listItemStyle = css({
  borderBottom: '1px solid #eee',
  padding: '16px 0',
});
const listItemTitleStyle = css({
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#222',
});
const listItemContentStyle = css({
  color: '#444',
});

// 리스트 컴포넌트(후기/상세정보 공용)
const List = ({ items, type }: { items: any[]; type: any }) => (
  <ul css={listStyle}>
    {items.map((item) => (
      <li key={type === 'review' ? item.id : item.name} css={listItemStyle}>
        <div css={listItemTitleStyle}>{type === 'review' ? item.authorName : item.name}</div>
        <div
          css={css([
            listItemContentStyle,
            type === 'review' && { whiteSpace: 'pre-line' },
          ])}
        >
          {type === 'review' ? item.content : item.value}
        </div>
      </li>
    ))}
  </ul>
);



// 탭 콘텐츠 분리 컴포넌트
interface ProductTabContentProps {
  selectedTab: number;
}

const ProductTabContent = ({ selectedTab }: ProductTabContentProps) => {
  const params = useParams();
  const productId = params.productId;
  const { data: detail } = useProductDetailQuery(productId);
  const { data: highlightReview } = useProductHighlightReviewQuery(productId);

  return (
    <section>
      {selectedTab === 0 && (
        <div
          css={descriptionStyle}
          dangerouslySetInnerHTML={{ __html: detail?.description || '' }}
        />
      )}
      {selectedTab === 1 && (
        <div>
          {highlightReview?.reviews?.length ? (
            <List items={highlightReview.reviews} type="review" />
          ) : (
            <div>후기가 없습니다.</div>
          )}
        </div>
      )}
      {selectedTab === 2 && (
        <div>
          {detail?.announcements?.length ? (
            <List items={detail.announcements} type="announcement" />
          ) : (
            <div>상세정보가 없습니다.</div>
          )}
        </div>
      )}
    </section>
  );
};


function ProductPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  // 라우터 param에서 productId 받아오기
  const params = useParams();
  const productId = params.productId;
  const { data: product } = useProductBasicQuery(productId);
  const { data: wish } = useProductWishQuery(productId);
  const [liked, setLiked] = useState(wish?.isWish);
  const [wishCount, setWishCount] = useState(wish?.wishCount);

  useEffect(() => {
    if (wish) {
      setLiked(wish.isWish);
      setWishCount(wish.wishCount);
    }
  }, [wish]);

  const handleProductClick = (productId: any) => {
    navigate(`/order/${productId}`);
  };

  // 좋아요(찜) 버튼 클릭 핸들러 - 낙관적 업데이트
  const handleLikeClick = () => {
    setLiked(!liked);
    setWishCount(wish.wishCount + (liked ? 0 : 1));
  };


  return (
    <>
      <GlobalStyle />
      <Header />

      {/* 상품 이미지 */}
      <img src={product?.imageURL} alt={product?.name} css={css({ width: '100%' })} />

      {/* 상품명, 가격 */}
      <div>
        <h2>{product?.name}</h2>
        <p>{product?.price?.sellingPrice}원</p>
      </div>

      {/* 브랜드 */}
      <div css={css({ display: 'flex', alignItems: 'center', gap: '12px' })}>
        <img src={product?.brandInfo?.imageURL} css={css({ width: '30px', height: '30px', borderRadius: '50%' })} />
        <p>{product?.brandInfo?.name}</p>
      </div>

      {/* 탭 메뉴 */}
      <nav css={tabMenuStyle}>
        {tabList.map((tab, idx) => (
          <button
            key={tab}
            css={tabButtonStyle(selectedTab === idx)}
            onClick={() => setSelectedTab(idx)}
          >
            {tab}
          </button>
        ))}
      </nav>


      <Suspense fallback={<Loading />}>
        <ProductTabContent selectedTab={selectedTab} />
      </Suspense>


      <footer css={footerStyle}>
        <button
          css={likeButtonStyle}
          onClick={handleLikeClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" css={css({ display: 'block', margin: '0 auto' })}>
            <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54l-1.35 1.31z" fill={liked ? '#FF4F4F' : '#bbb'} />
          </svg>
          <span>{wishCount !== null ? wishCount : wish?.wishCount}</span>
        </button>
        <button onClick={() => handleProductClick(productId)} css={orderButtonStyle}>주문하기</button>
      </footer>

    </>
  );
}


const likeButtonStyle = css({
  backgroundColor: 'white',
  border: 'none',
  borderRadius: 6,
  padding: '8px 0',
  marginRight: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '56px',
  transition: 'color 0.2s',
  '& svg path': {
    transition: 'fill 0.2s',
  },
});

const tabMenuStyle = css({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  padding: '0 0 0 0',
  backgroundColor: '#f8f8f8',
  borderBottom: '1px solid #eee',
  height: '56px',
});

const tabButtonStyle = (selected: boolean) => css({
  flex: 1,
  background: 'none',
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  color: selected ? '#222' : '#bbb',
  fontWeight: selected ? 'bold' : 'normal',
  padding: '16px 0 8px 0',
  cursor: 'pointer',
  position: 'relative',
  transition: 'color 0.2s',
  '&:after': selected ? {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '3px',
    background: '#222',
  } : {},
});

const footerStyle = css({
  display: 'flex',
  position: 'relative',
});

const orderButtonStyle = css({
  width: '100%',
  padding: '16px',
  fontSize: '18px',
  border: 'none',
  backgroundColor: colors.kakaoYellow,
  fontWeight: 'bold',
  cursor: 'pointer',
});

const descriptionStyle = css({
  maxWidth: '100%',
  width: '100%',
  margin: '0 auto',
  wordBreak: 'break-word',
  overflow: 'hidden',
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
});

export default ProductPage;