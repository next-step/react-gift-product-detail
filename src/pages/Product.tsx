import { PageContainer } from '@/shared/components'
import { useParams } from 'react-router-dom'

// * 주문하기 페이지 (주문하기 폼 Provider 포함)
export const Product = () => {
  // * URL 파라미터로 부터 상품 id 값 가져오기
  const { id } = useParams<{ id: string }>()

  return <PageContainer>No.{id} : 상품 상세 페이지</PageContainer>
}

export default Product
