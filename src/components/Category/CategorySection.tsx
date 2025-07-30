import styled from '@emotion/styled'
import { CategoryItem } from '@/components/Category/CategoryItem'
import { FiPlus } from 'react-icons/fi'
import axios from 'axios'
import { useAuth } from '@/contexts/AuthContext'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

interface Theme {
  themeId: number
  name: string
  image: string
}

const fetchThemes = async (): Promise<Theme[]> => {
  const response = await axios.get<{ data: Theme[] }>(
    `${import.meta.env.VITE_API_BASE_URL}/api/themes`
  )
  return response.data.data
}

export function useThemesQuery() {
  return useSuspenseQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  })
}

export function CategorySection() {
  return (
    <ErrorBoundary fallback={<p>선물 테마 로딩 중 오류가 발생했습니다.</p>}>
      <Suspense fallback={<p>선물 테마 로딩중...</p>}>
        <CategorySectionContent />
      </Suspense>
    </ErrorBoundary>
  )
}

function CategorySectionContent() {
  const { data: themes } = useThemesQuery()
  const { user } = useAuth()

  if (!themes || themes.length === 0) {
    return null
  }

  return (
    <SectionWrapper>
      <MessageBox>
        <PlusIconWrapper>
          <FiPlus size={16} color="#000" />
        </PlusIconWrapper>
        <MessageText>
          {user?.name
            ? `${user?.name}님! 선물할 친구를 선택해 주세요.`
            : '선물할 친구를 선택해 주세요.'}
        </MessageText>
      </MessageBox>

      <Title>선물 테마</Title>

      <GridWrapper>
        {themes.map(({ themeId, name, image }) => (
          <CategoryItem
            key={themeId}
            themeId={themeId}
            name={name}
            image={image}
          />
        ))}
      </GridWrapper>

      <NoticeBox>
        <NoticeText>카카오테크 캠퍼스 3기여러분</NoticeText>
        <StrongText>프론트엔드 2단계 과제 화이팅! 🎉</StrongText>
      </NoticeBox>
    </SectionWrapper>
  )
}

const SectionWrapper = styled.section`
  width: 100%;
  margin-bottom: 40px;
`

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: 8px;
  margin-bottom: 24px;
`
const PlusIconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MessageText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textDefault};
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textDefault};
`

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`

const NoticeBox = styled.div`
  margin-top: 32px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  text-align: left;
`

const NoticeText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 4px;
`

const StrongText = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDefault};
`
