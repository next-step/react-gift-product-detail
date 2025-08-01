import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Loading from '@/component/Loading/Loading'
import { ROUTE_PATH } from '@/routes/Router'
import type { Gender, Type } from '@/features/Gift/types/GiftTypes'
import type { Product } from '@/types/CommonTypes'
import { ErrorBoundary } from '@/component/Error/ErrorBoundary'
import RankingSection from './RakingSection'
import { FilterGender, FilterType } from './TrendingGiftRankingFilter'
import * as S from './TrendingGiftRanking.styles'

const genderList = [
  { label: 'All', icon: 'ALL' },
  { label: '남성이', icon: '👨‍🦰' },
  { label: '여성이', icon: '👩‍🦰' },
  { label: '청소년이', icon: '👦' },
] as const
const typeList = ['받고 싶어한', '많이 선물한', '위시로 받은'] as const

const TrendingGiftRanking = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedGender = (searchParams.get('gender') ??
    genderList[0].label) as Gender
  const selectedType = (searchParams.get('type') ?? typeList[0]) as Type

  const navigate = useNavigate()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    console.log(`선택된 상품 : ${product.name}`)
    navigate(ROUTE_PATH.PRODUCT.replace(':productId', String(product.id)))
  }

  const handleGenderSelect = (gender: Gender) => {
    const params = new URLSearchParams(searchParams)
    params.set('gender', gender)
    if (selectedType) params.set('type', selectedType)
    setSearchParams(params, { replace: true })
  }

  const handleTypeSelect = (type: Type) => {
    const params = new URLSearchParams(searchParams)
    params.set('type', type)
    if (selectedGender) params.set('gender', selectedGender)
    setSearchParams(params, { replace: true })
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const prevGender = params.get('gender')
    const prevType = params.get('type')

    const isGenderValid = genderList.some((g) => g.label === selectedGender)
    const isTypeValid = typeList.includes(selectedType as Type)

    if (!isGenderValid) params.set('gender', genderList[0].label)
    if (!isTypeValid) params.set('type', typeList[0])

    const nextGender = params.get('gender')
    const nextType = params.get('type')

    const isChanged = prevGender !== nextGender || prevType !== nextType

    if (isChanged) setSearchParams(params, { replace: true })
  }, [searchParams, selectedGender, selectedType, setSearchParams])

  return (
    <S.Container>
      <S.Title>실시간 급상승 선물랭킹</S.Title>
      <S.GenderTab>
        {genderList.map(({ icon, label }) => (
          <FilterGender
            key={label}
            icon={icon}
            label={label}
            isActive={selectedGender === label}
            onClick={handleGenderSelect}
          />
        ))}
      </S.GenderTab>
      <S.TypeTab>
        {typeList.map((label) => (
          <FilterType
            key={label}
            label={label}
            isActive={selectedType === label}
            onClick={handleTypeSelect}
          />
        ))}
      </S.TypeTab>

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <RankingSection
            selectedGender={selectedGender}
            selectedType={selectedType}
            onProductSelect={handleProductSelect}
          />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  )
}

export default TrendingGiftRanking
