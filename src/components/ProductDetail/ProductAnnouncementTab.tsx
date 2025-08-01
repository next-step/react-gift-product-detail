import { Suspense } from "react"
import ErrorBoundary from "@/components/ErrorBoundary"
import Loading from "@/components/PresentTheme/Loading"
import Layout from "@/components/Layout"
import Text from "@/components/Text"
import useProductDetail from "@/hooks/useProductDetail"

interface ProductAnnouncementTabProps {
  productId: string
}

const AnnouncementContent = ({ productId }: { productId: string }) => {
  const { data: detailData } = useProductDetail(productId)

  if (!detailData?.announcements || detailData.announcements.length === 0) {
    return (
      <Layout
        paddingLeft="spacing4"
        paddingRight="spacing4"
        height="auto"
        paddingDown="spacing16"
      >
        <Text variant="body1Regular" margin="spacing0" padding="spacing0">
          상세정보가 없습니다.
        </Text>
      </Layout>
    )
  }

  return (
    <Layout
      paddingLeft="spacing4"
      paddingRight="spacing4"
      height="auto"
      paddingDown="spacing16"
    >
      {detailData.announcements.map((announcement) => (
        <div key={announcement.displayOrder} style={{ marginBottom: "16px" }}>
          <Text variant="body2Bold" margin="spacing0" padding="spacing0">
            {announcement.name}
          </Text>
          <Text variant="body2Regular" margin="spacing0" padding="spacing0">
            {announcement.value}
          </Text>
        </div>
      ))}
    </Layout>
  )
}

const ProductAnnouncementTab = ({ productId }: ProductAnnouncementTabProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <AnnouncementContent productId={productId} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ProductAnnouncementTab
