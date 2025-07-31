import { Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '@/Layout'
import ErrorBoundary from '@/components/ErrorBoundary'
import {
  useProductQuery,
  useProductDetailQuery,
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
  OrderButton,
} from '@/styles/ProductDetailPage.styles'

function DetailContent({ productId }: { productId: number }) {
  const navigate = useNavigate()
  const { data: product } = useProductQuery(productId)
  const { data: detail } = useProductDetailQuery(productId)
  const { data: wishCount = 0 } = useWishCountQuery(productId)
  const { mutate } = useWishMutation(productId)

  return (
    <Container>
      <ProductImage src={product.imageURL} alt={product.name} />
      <div>
        <Name>{product.name}</Name>
        <Brand>{product.brandInfo.name}</Brand>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        <WishButton onClick={() => mutate()}>
          ❤️ {wishCount}
        </WishButton>
      </div>
      {detail && (
        <InfoList>
          {detail.info.map((item, idx) => (
            <InfoItem key={idx}>
              <strong>{item.label}</strong>
              <div>{item.value}</div>
            </InfoItem>
          ))}
        </InfoList>
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