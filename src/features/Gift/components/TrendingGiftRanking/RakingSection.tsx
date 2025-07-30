import { useProductsRanking } from '@/features/Gift/hooks/useProductsRanking'
import * as S from './TrendingGiftRanking.styles'
import ProductCard from '@/component/ProductCard/ProductCard'
import type { Gender, Type, Product } from '@/features/Gift/types/GiftTypes'
import { useState } from 'react'

const INITIAL_VISIBLE_COUNT = 6

const RankingSection = ({
  selectedGender,
  selectedType,
  onProductSelect,
}: {
  selectedGender: Gender
  selectedType: Type
  onProductSelect: (product: Product) => void
}) => {
  const products = useProductsRanking(selectedGender, selectedType)

  const [isExpanded, setIsExpanded] = useState(false)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const handleToggleView = () => {
    setIsExpanded(!isExpanded)
    setVisibleCount(isExpanded ? INITIAL_VISIBLE_COUNT : products.length)
  }

  if (products.length === 0) {
    return <S.NoProduct>상품이 존재하지 않습니다.</S.NoProduct>
  }

  return (
    <ProductCard
      products={products}
      visibleCount={visibleCount}
      isExpanded={isExpanded}
      onProductSelect={onProductSelect}
      onToggleView={handleToggleView}
    />
  )
}

export default RankingSection
