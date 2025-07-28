import { useState } from 'react'
import styled from '@emotion/styled'
import { Typography } from '@/shared/components'
import type { ProductDetail, ProductHighlightReview } from '@/api/types'

// * 탭 타입 정의
type TabType = 'description' | 'reviews' | 'details'

interface ProductTabsProps {
  productDetail?: ProductDetail
  reviews?: ProductHighlightReview
}

// * 상품 탭 컴포넌트
export const ProductTabs = ({ productDetail, reviews }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('description')

  const tabs = [
    { id: 'description' as const, label: '상품설명' },
    { id: 'reviews' as const, label: '선물후기' },
    { id: 'details' as const, label: '상세정보' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <TabContent>
            {productDetail?.description ? (
              <DescriptionContent dangerouslySetInnerHTML={{ __html: productDetail.description }} />
            ) : (
              <EmptyContent>상품 설명이 없습니다.</EmptyContent>
            )}
          </TabContent>
        )
      case 'reviews':
        return (
          <TabContent>
            {reviews?.reviews && reviews.reviews.length > 0 ? (
              <ReviewsList>
                {reviews.reviews.map((review, index: number) => (
                  <ReviewItem key={index}>
                    <ReviewAuthor variant="label1Bold">{review.authorName}</ReviewAuthor>
                    <ReviewText variant="body1Regular">{review.content}</ReviewText>
                  </ReviewItem>
                ))}
              </ReviewsList>
            ) : reviews?.totalCount && reviews.totalCount > 0 ? (
              <EmptyContent>후기 데이터를 불러오는 중...</EmptyContent>
            ) : (
              <EmptyContent>아직 후기가 없습니다.</EmptyContent>
            )}
          </TabContent>
        )
      case 'details':
        return (
          <TabContent>
            {productDetail?.announcements && productDetail.announcements.length > 0 ? (
              <DetailsList>
                {productDetail.announcements.map((item, index: number) => (
                  <DetailItem key={index}>
                    <DetailLabel variant="label1Bold">{item.name}</DetailLabel>
                    <DetailValue variant="body1Regular">{item.value}</DetailValue>
                  </DetailItem>
                ))}
              </DetailsList>
            ) : (
              <EmptyContent>상세 정보가 없습니다.</EmptyContent>
            )}
          </TabContent>
        )
      default:
        return null
    }
  }

  return (
    <TabsContainer>
      <TabsHeader>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <TabLabel variant="subtitle2Regular">{tab.label}</TabLabel>
            {activeTab === tab.id && <ActiveIndicator />}
          </TabButton>
        ))}
      </TabsHeader>
      <TabsContent>{renderTabContent()}</TabsContent>
    </TabsContainer>
  )
}

// * 탭 컨테이너
const TabsContainer = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.semanticColors.background.default};
  overflow: hidden;
`

// * 탭 헤더
const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.semanticColors.border.disabled};
  background-color: ${({ theme }) => theme.semanticColors.background.default};
`

// * 탭 버튼
const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing1};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.semanticColors.background.fill};
  }
`

// * 탭 라벨
const TabLabel = styled(Typography)`
  color: ${({ theme }) => theme.semanticColors.text.default};
`

// * 활성 탭 인디케이터
const ActiveIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.semanticColors.brand.kakaoYellow};
`

// * 탭 컨텐츠
const TabsContent = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing8} ${({ theme }) => theme.spacing.spacing4};
  max-width: 100%;
  overflow-x: hidden;
`

// * 탭 컨텐츠 내부
const TabContent = styled.div`
  min-height: 200px;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`

// * 빈 컨텐츠
const EmptyContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${({ theme }) => theme.semanticColors.text.sub};
`

// * 리뷰 리스트
const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing4};
`

// * 리뷰 아이템
const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing1};
`

// * 리뷰 작성자
const ReviewAuthor = styled(Typography)``

// * 리뷰 텍스트
const ReviewText = styled(Typography)``

// * 상세 정보 리스트
const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing4};
`

// * 상세 정보 아이템
const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing1};
`

// * 상세 정보 라벨
const DetailLabel = styled(Typography)``

// * 상세 정보 값
const DetailValue = styled(Typography)``

// * 상품 설명 컨텐츠
const DescriptionContent = styled.div`
  line-height: 1.6;
  color: ${({ theme }) => theme.semanticColors.text.default};

  img {
    max-width: 100%;
    height: auto;
    margin: ${({ theme }) => theme.spacing.spacing2} 0;
  }

  p {
    margin: ${({ theme }) => theme.spacing.spacing2} 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: ${({ theme }) => theme.spacing.spacing3} 0 ${({ theme }) => theme.spacing.spacing2} 0;
  }
`
