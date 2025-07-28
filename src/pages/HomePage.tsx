import GlobalStyle from '@/styles/GlobalStyle'
import Header from '@/components/Header'
import FriendSelector from '@/components/FriendSelector'
import CategoryList from '@/components/CategoryList'
import NoticeBanner from '@/components/NoticeBanner'
import RankingTabs from '@/components/RankingTabs'

function Home() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <FriendSelector />
      <CategoryList />
      <NoticeBanner />
      <RankingTabs />
    </div>
  )
}

export default Home;