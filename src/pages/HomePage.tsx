import GlobalStyle from '@/styles/GlobalStyle'
import Header from '@/components/Header'
import FriendSelector from '@/components/FriendSelector'
import CategoryList from '@/components/CategoryList'
import NoticeBanner from '@/components/NoticeBanner'
import RankingTabs from '@/components/RankingTabs'
import { Suspense } from 'react'
import Loading from '@/components/Common/Loading'

function Home() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <GlobalStyle />
        <Header />
        <FriendSelector />
        <CategoryList />
        <NoticeBanner />
        <RankingTabs />
      </Suspense>
    </div>
  )
}

export default Home;