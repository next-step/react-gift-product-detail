import { Suspense } from "react"
import ErrorBoundary from "@/components/ErrorBoundary"
import Loading from "@/components/PresentTheme/Loading"
import Layout from "@/components/Layout"
import Text from "@/components/Text"
import { useProductReviews } from "@/hooks/useProductReviews"

interface ProductReviewTabProps {
  productId: string
}

const ReviewContent = ({ productId }: { productId: string }) => {
  const {
    data: reviewData,
    isLoading,
    error,
  } = useProductReviews(productId, true)

  if (error) throw error
  if (isLoading) return <Loading />

  if (!reviewData?.reviews || reviewData.reviews.length === 0) {
    return (
      <Layout
        height="auto"
        marginBottom="spacing0"
        paddingLeft="spacing4"
        paddingRight="spacing4"
        paddingDown="spacing16"
      >
        <Text variant="body1Regular" margin="spacing0" padding="spacing0">
          아직 작성된 후기가 없습니다.
        </Text>
      </Layout>
    )
  }

  return (
    <Layout
      height="auto"
      marginBottom="spacing0"
      paddingLeft="spacing4"
      paddingRight="spacing4"
      paddingDown="spacing16"
    >
      {reviewData.reviews.map((review) => (
        <div key={review.id} style={{ marginBottom: "16px" }}>
          <Text variant="subtitle2Bold" margin="spacing0" padding="spacing0">
            {review.authorName}
          </Text>
          <Text variant="body1Regular" margin="spacing0" padding="spacing0">
            {review.content}
          </Text>
        </div>
      ))}
    </Layout>
  )
}

const ProductReviewTab = ({ productId }: ProductReviewTabProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ReviewContent productId={productId} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ProductReviewTab
