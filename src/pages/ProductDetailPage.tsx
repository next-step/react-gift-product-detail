import { Suspense, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '@/Layout'
import ErrorBoundary from '@/components/ErrorBoundary'
import {
  useProductQuery,
  useProductDetailQuery,
  useHighlightReviewQuery,
  useWishCountQuery,
  useWishMutation,
} from '@/api/product'
import {
  Container,
  ProductImage,
  Name,
  Brand,
  Price,
  TabBar,
  TabButton,
  ContentArea,
  ReviewCard,
  ReviewAuthor,
  ReviewContent,
  EmptyText,
  StickyBar,
  LikeSection,
  LikeButton,
  LikeCount,
  OrderButton,
} from '@/styles/ProductDetailPage.styles'

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? '#2a3038' : 'none'}
      stroke="#2a3038"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function DetailContent({ productId }: { productId: number }) {
  const navigate = useNavigate()
  const { data: product } = useProductQuery(productId, { suspense: true })
  const { data: detail } = useProductDetailQuery(productId, { suspense: true })
  const { data: reviews } = useHighlightReviewQuery(productId, { suspense: true })
  const { data: wishInfo } = useWishCountQuery(productId, { suspense: true })
  const { mutate } = useWishMutation(productId)

    const [tab, setTab] = useState<'description' | 'reviews' | 'details'>('description')
  const [liked, setLiked] = useState<boolean>(wishInfo?.isWished ?? false)
  const [likeCount, setLikeCount] = useState<number>(wishInfo?.wishCount ?? 0)

  const toggleLike = () => {
    if (liked) {
      setLikeCount((c) => Math.max(0, c - 1))
      setLiked(false)
    } else {
      setLikeCount((c) => c + 1)
      setLiked(true)
      mutate()
    }
  }

  return (
    <Container>
      <ProductImage src={product.imageURL} alt={product.name} />
      <div>
        <Name>{product.name}</Name>
        <Brand>{product.brandInfo.name}</Brand>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
      </div>
      
      <TabBar>
        <TabButton active={tab === 'description'} onClick={() => setTab('description')}>
          상품설명
        </TabButton>
        <TabButton active={tab === 'reviews'} onClick={() => setTab('reviews')}>
          선물후기
        </TabButton>
        <TabButton active={tab === 'details'} onClick={() => setTab('details')}>
          상세정보
        </TabButton>
      </TabBar>

      <ContentArea>
        {tab === 'description' && detail && (
          <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        )}
        {tab === 'reviews' && (
          <div>
            {reviews?.reviews.map((rv) => (
              <ReviewCard key={rv.id}>
                <ReviewAuthor>{rv.authorName}</ReviewAuthor>
                <ReviewContent>{rv.content}</ReviewContent>
              </ReviewCard>
            ))}
            {reviews && reviews.reviews.length === 0 && (
              <EmptyText>등록된 후기가 없습니다.</EmptyText>
            )}
          </div>
        )}
        {tab === 'details' && detail && (
          <div>
            {Array.isArray(detail.announcement) && (
              <ul>
                {detail.announcement
                  .slice()
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.name}</strong>
                      <div>{item.value}</div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </ContentArea>

      <StickyBar>
        <LikeSection>
          <LikeButton onClick={toggleLike}>
            <HeartIcon filled={liked} />
            <LikeCount>{likeCount}</LikeCount>
          </LikeButton>
        </LikeSection>
        <OrderButton onClick={() => navigate(`/order/${productId}`)}>주문하기</OrderButton>
      </StickyBar>
    </Container>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  if (!id || Number.isNaN(productId)) {
    return (
      <Layout>
        <p>잘못된 접근입니다.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<p>로딩 중...</p>}>
          <DetailContent productId={productId} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}