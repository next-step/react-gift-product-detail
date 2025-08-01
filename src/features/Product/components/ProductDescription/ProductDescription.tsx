import { useState } from 'react'
import * as S from './ProductDescription.styles'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

interface ProductDescriptionProps {
  description: string
  reviews: { id: string; authorName: string; content: string }[]
  announcements: { name: string; value: string; displayOrder: number }[]
}

const TABS = ['상세 설명', '선물 후기', '상세 정보'] as const
type TabType = (typeof TABS)[number]

const ProductDescription = ({
  description,
  reviews,
  announcements,
}: ProductDescriptionProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('상세 설명')
  const cleanHtml = DOMPurify.sanitize(description)

  const renderTabContent = () => {
    switch (activeTab) {
      case '상세 설명':
        return <S.TabContent>{parse(cleanHtml)}</S.TabContent>
      case '선물 후기':
        return (
          <S.TabContent>
            {reviews.length === 0 ? (
              <p>후기가 없습니다.</p>
            ) : (
              reviews.map((review) => (
                <S.ReviewCard key={review.id}>
                  <S.AuthorName>{review.authorName}</S.AuthorName>
                  <S.ReviewText>{review.content}</S.ReviewText>
                </S.ReviewCard>
              ))
            )}
          </S.TabContent>
        )
      case '상세 정보':
        return (
          <S.TabContent>
            {announcements.map((item) => (
              <S.InfoItem key={item.displayOrder}>
                <S.InfoLabel>{item.name}</S.InfoLabel>
                <S.InfoValue>{item.value}</S.InfoValue>
              </S.InfoItem>
            ))}
          </S.TabContent>
        )
      default:
        return null
    }
  }

  return (
    <S.Container>
      <S.TabList>
        {TABS.map((tab) => (
          <S.TabButton
            key={tab}
            isActive={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </S.TabButton>
        ))}
      </S.TabList>
      {renderTabContent()}
    </S.Container>
  )
}

export default ProductDescription
