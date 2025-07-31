import { Suspense } from 'react'
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
  WishButton,
  InfoList,
  InfoItem,
  Description,
  ReviewList,
  ReviewItem,
  OrderButton,
} from '@/styles/ProductDetailPage.styles'

function DetailContent({ productId }: { productId: number }) {
  const navigate = useNavigate()
  const { data: product } = useProductQuery(productId, { suspense: true })
  const { data: detail } = useProductDetailQuery(productId, { suspense: true })
  const { data: reviews } = useHighlightReviewQuery(productId, { suspense: true })
  const { data: wishInfo } = useWishCountQuery(productId, { suspense: true })
  const { mutate } = useWishMutation(productId)

  return (
    <Container>
      <ProductImage src={product.imageURL} alt={product.name} />
      <div>
        <Name>{product.name}</Name>
        <Brand>{product.brandInfo.name}</Brand>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        <WishButton onClick={() => mutate()}>
          ❤️ {wishInfo?.wishCount ?? 0}
        </WishButton>
      </div>
      {detail && (
                <>
          <Description>{detail.description}</Description>
                    {Array.isArray(detail.announcement) && (
            <InfoList>
              {detail.announcement
                .slice()
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((item, idx) => (
                  <InfoItem key={idx}>
                    <strong>{item.name}</strong>
                    <div>{item.value}</div>
                  </InfoItem>
                ))}
            </InfoList>
          )}
        </>
      )}
      {reviews && reviews.reviews.length > 0 && (
        <ReviewList>
          {reviews.reviews.map((rv) => (
            <ReviewItem key={rv.id}>
              <strong>{rv.authorName}</strong>
              <p>{rv.content}</p>
            </ReviewItem>
          ))}
        </ReviewList>
      )}
      <OrderButton onClick={() => navigate(`/order/${productId}`)}>
        주문하기
      </OrderButton>
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