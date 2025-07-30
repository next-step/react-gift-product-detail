import { Suspense, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorBoundary } from '@/component/Error/ErrorBoundary'
import Loading from '@/component/Loading/Loading'
import OrderPageContent from '@/features/Order/components/OrderPageContent/OrderPageContent'

import { ROUTE_PATH } from '@/routes/Router'

const OrderPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()

  const idNum = Number(productId)
  const isInvalidId = !productId || isNaN(idNum)

  useEffect(() => {
    if (!isInvalidId) return
    toast.error('잘못된 상품 경로입니다.')
    navigate(ROUTE_PATH.GIFT, { replace: true })
  }, [isInvalidId, navigate])

  if (isInvalidId) return null

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <OrderPageContent idNum={idNum} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default OrderPage
