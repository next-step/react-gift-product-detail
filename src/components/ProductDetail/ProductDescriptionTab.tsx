import { Suspense } from "react"
import ErrorBoundary from "@/components/ErrorBoundary"
import Loading from "@/components/PresentTheme/Loading"
import Layout from "@/components/Layout"
import ProductDescription from "@/components/ProductDetail/ProductDescription"
import useProductDetail from "@/hooks/useProductDetail"

interface ProductDescriptionTabProps {
  productId: string
}

const DescriptionContent = ({ productId }: { productId: string }) => {
  const {
    data: detailData,
    isLoading,
    error,
  } = useProductDetail(productId, true)

  if (error) throw error
  if (isLoading) return <Loading />

  return (
    <Layout height="auto" paddingDown="spacing16" paddingUp="spacing4">
      <ProductDescription
        dangerouslySetInnerHTML={{
          __html: detailData?.description ?? "",
        }}
      />
    </Layout>
  )
}

const ProductDescriptionTab = ({ productId }: ProductDescriptionTabProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <DescriptionContent productId={productId} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ProductDescriptionTab
