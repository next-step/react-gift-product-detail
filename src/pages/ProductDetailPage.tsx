import styled from '@emotion/styled'
import { Navbar } from '@/components/Navbar/Navbar'
import { Layout } from '@/components/Layout/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { useProductDetail } from '@/hooks/useProductDetail'
import { LikeButton } from '@/components/Product/LikeButton'

export function ProductDetailPage() {
  return (
    <ErrorBoundary
      fallback={<div>상세 페이지 로딩 중 오류가 발생했습니다.</div>}
    >
      <Suspense fallback={<div>상품 로딩중...</div>}>
        <ProductDetailContent />
      </Suspense>
    </ErrorBoundary>
  )
}

type ProductTab = 'description' | 'review' | 'detail'

function ProductDetailContent() {
  const { productId = '' } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ProductTab>('description')
  const { product, detail, wishInfo, reviews } = useProductDetail(productId)

  return (
    <Layout>
      <Navbar />
      <Container>
        <Image src={product.imageURL} alt={product.name} />

        <InfoSection>
          <BrandInfo>
            <BrandImage
              src={product.brandInfo.imageURL}
              alt={product.brandInfo.name}
            />
            <BrandName>{product.brandInfo.name}</BrandName>
          </BrandInfo>
          <Name>{product.name}</Name>
          <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        </InfoSection>

        <TabMenu>
          <Tab
            active={activeTab === 'description'}
            onClick={() => setActiveTab('description')}
          >
            상품설명
          </Tab>
          <Tab
            active={activeTab === 'review'}
            onClick={() => setActiveTab('review')}
          >
            선물후기
          </Tab>
          <Tab
            active={activeTab === 'detail'}
            onClick={() => setActiveTab('detail')}
          >
            상세정보
          </Tab>
        </TabMenu>

        <TabContent>
          {activeTab === 'description' && (
            <div dangerouslySetInnerHTML={{ __html: detail.description }} />
          )}
          {activeTab === 'review' && (
            <ul>
              {reviews.reviews.map((r) => (
                <li key={r.id}>
                  <strong>{r.authorName}</strong>
                  <br />
                  {r.content}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'detail' && (
            <ul>
              {detail.announcements.map((a) => (
                <li key={a.displayOrder}>
                  <strong>{a.name}</strong>
                  <br />
                  {a.value}
                </li>
              ))}
            </ul>
          )}
        </TabContent>

        <ButtonGroup>
          <LikeButton productId={productId} wishCount={wishInfo.wishCount} />
          <OrderButton onClick={() => navigate(`/order/${productId}`)}>
            주문하기
          </OrderButton>
        </ButtonGroup>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  width: 100%;
`
const Image = styled.img`
  width: 100%;
`
const InfoSection = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`
const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const BrandImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`
const BrandName = styled.span`
  font-size: 0.875rem;
`
const Name = styled.h2`
  margin: 0.5rem 0;
`
const Price = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
`

const TabMenu = styled.div`
  display: flex;
  margin: 1rem 0;
`

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.875rem 2rem;
  font-size: 0.9rem;
  border: none;
  background: none;
  color: ${({ active, theme }) => (active ? 'black' : theme.colors.gray600)};
  cursor: pointer;
  &:hover {
    background: ${({ active, theme }) => (active ? 'none' : theme.colors.gray200)};
`
const TabContent = styled.div`
  strong {
    font-weight: 600;
  }
  padding: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 16px 0;
`

const OrderButton = styled.button`
  flex: 9;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.kakaoYellow};
  color: black;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
`
