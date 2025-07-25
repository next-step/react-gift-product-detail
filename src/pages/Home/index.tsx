import { ThemesSection } from '@/features/themes'
import { Trend } from '@/features/product'
import styled from '@emotion/styled'
import { PageContainer } from '@/shared/components'
import { Friends } from '@/pages/Home/Friends'
import { Banner } from '@/pages/Home/Banner'

export const Home = () => {
  return (
    <HomeContainer>
      {/* 선물할 친구 섹션 */}
      <Friends />
      {/* 테마(Themes) 섹션 */}
      <ThemesSection />
      {/* 기타 배너 섹션 */}
      <Banner />
      {/* 실시간 급상승 섹션 */}
      <Trend />
    </HomeContainer>
  )
}

// * 홈 컨테이너 스타일 확장
const HomeContainer = styled(PageContainer)`
  /* 홈 페이지의 경우 위쪽으로 정렬 */
  justify-content: flex-start;
`

export default Home
