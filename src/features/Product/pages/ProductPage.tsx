import { ErrorBoundary } from '@/component/Error/ErrorBoundary'
import ProductPageContent from '../components/ProductPageContent/ProductPageContent'
import Loading from '@/component/Loading/Loading'
import { Suspense } from 'react'

const ProductPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ProductPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ProductPage
