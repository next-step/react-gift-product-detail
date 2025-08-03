import { Suspense, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '@/Layout'
import ErrorBoundary from '@/components/ErrorBoundary'
import HeartIcon from '@/components/HeartIcon'
import type { ProductAnnouncementItem } from '@/type'
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
  InfoList,
  InfoItem,
  StickyBar,
  LikeSection,
  LikeButton,
  LikeCount,
  OrderButton,
} from '@/styles/ProductDetailPage.styles'
interface AnnouncementListProps {
  items?: ProductAnnouncementItem[]
}
function AnnouncementList({ items = [] }: AnnouncementListProps) {
  if (items.length === 0) {
    return <EmptyText>등록된 상세 정보가 없습니다.</EmptyText>
  }

  const sorted = [...items].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  )

  return (
    <InfoList>
      {sorted.map((item, idx) => (
        <InfoItem key={idx}>
          <strong>{item.name}</strong>
          <div>{item.value}</div>
        </InfoItem>
      ))}
    </InfoList>
  )
}

function DetailContent({ productId }: { productId: number }) {
  const navigate = useNavigate()
  const { data: product } = useProductQuery(productId)
  const { data: detail } = useProductDetailQuery(productId)
  const { data: reviews } = useHighlightReviewQuery(productId)
  const { data: wishInfo } = useWishCountQuery(productId)
  const { mutate } = useWishMutation(productId)

  const [tab, setTab] = useState<'description' | 'reviews' | 'details'>(
    'description',
  )
  const [liked, setLiked] = useState<boolean>(wishInfo.isWished)
  const [likeCount, setLikeCount] = useState<number>(wishInfo.wishCount)

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
        <TabButton
          active={tab === 'description'}
          onClick={() => setTab('description')}
        >
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
          <AnnouncementList items={detail.announcement} />
        )}
      </ContentArea>

      <StickyBar>
        <LikeSection>
          <LikeButton onClick={toggleLike}>
            <HeartIcon filled={liked} />
            <LikeCount>{likeCount}</LikeCount>
          </LikeButton>
        </LikeSection>
        <OrderButton onClick={() => navigate(`/order/${productId}`)}>
          주문하기
        </OrderButton>
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
