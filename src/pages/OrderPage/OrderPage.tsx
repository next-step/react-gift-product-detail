import styled from '@emotion/styled'
import { Navbar } from '@/components/Navbar/Navbar'
import { Layout } from '@/components/Layout/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { OrderForm } from '@/components/OrderPage/OrderForm'
import { toast } from 'react-toastify'
import type { Product } from '@/types/product'
import { useQuery } from '@tanstack/react-query'
import { ROUTE_PATH } from '@/routes/AppRoutes'

const fetchProduct = async (id: string): Promise<Product> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
  )
  return response.data.data
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    retry: false,
  })
}

export function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, isError, error } = useProductQuery(id || '')

  if (isLoading) return <div>상품 로딩중...</div>

  if (isError) {
    if (error instanceof axios.AxiosError) {
      const message = error.response?.data.data.message
      toast.error(typeof message === 'string' ? message : '잘못된 요청입니다.')
      navigate(ROUTE_PATH.HOME, { replace: true })
    }
  }

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
