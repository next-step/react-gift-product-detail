// src/components/RankingList.tsx

import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import styled from '@emotion/styled'
import { spacing } from '@/theme/spacing'
import LoadMoreButton from './LoadMoreButton'
import RankingItem from './RankingItem'
import RankingSkeleton from './RankingSkeleton'
import { useProductRankingQuery } from '@/api/product'
import { targetMap, rankMap } from '@/constants/ranking'


//— RankingList 컴포넌트
const RankingList: React.FC = () => {
  const [searchParams] = useSearchParams()
  const gender = searchParams.get('gender') ?? 'all'
  const sort = searchParams.get('sort') ?? 'wanted'

  const [expanded, setExpanded] = useState(false)
  const targetType = targetMap[gender] ?? 'ALL'
  const rankType = rankMap[sort] ?? 'MANY_WISH'
  const {
    data: products = [],
    isLoading,
    isError,
  } = useProductRankingQuery(targetType, rankType)
  const visibleItems = expanded ? products : products.slice(0, 6)
  
  if (isLoading) {
    return (
      <Wrapper>
        <RankingSkeleton />
      </Wrapper>
    )
  }

  if (isError || products.length === 0) {
    return <Wrapper>상품 목록이 없습니다.</Wrapper>

  }

  return (
    <Wrapper>
      <GridContainer>
        {visibleItems.map((prod, idx) => (
          <RankingItem key={prod.id} rank={idx + 1} product={prod} />
        ))}
      </GridContainer>
      {products.length > 6 && (
        <ButtonWrap>
          <LoadMoreButton onClick={() => setExpanded((p) => !p)}>
            {expanded ? '접기' : '더보기'}
          </LoadMoreButton>
        </ButtonWrap>
      )}
    </Wrapper>
  )
}

export default RankingList

//— styled components
const Wrapper = styled.div`
  padding: 0 ${spacing.spacing4};
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.spacing4};
`

const ButtonWrap = styled.div`
  margin-top: ${spacing.spacing4};
`
