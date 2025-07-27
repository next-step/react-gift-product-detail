import styled from '@emotion/styled'
import { Navbar } from '@/components/Navbar/Navbar'
import { Layout } from '@/components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { OrderForm } from '@/components/OrderPage/OrderForm'
import type { Product } from '@/types/product'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

const fetchProduct = async (id: string): Promise<Product> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
  )
  return response.data.data
}

export function useProductQuery(id: string) {
  return useSuspenseQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    retry: false,
  })
}

export function OrderPage() {
  return (
    <ErrorBoundary fallback={<p>상품 로딩 중 오류가 발생했습니다.</p>}>
      <Suspense fallback={<p>상품 로딩중...</p>}>
        <OrderPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

function OrderPageContent() {
  const { id } = useParams<{ id: string }>()
  const { data: product } = useProductQuery(id || '')

  if (!product) return <div>상품을 찾을 수 없습니다.</div>

  return (
    <>
      <Layout>
        <Navbar />
        <Container>
          <OrderForm product={product} />
        </Container>
      </Layout>
    </>
  )
}

const Container = styled.div`
  width: 100%;
`
