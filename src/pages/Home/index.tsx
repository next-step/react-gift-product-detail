import { FriendSelector } from '@/features/friendSelection';
import { ThemeSection } from '@/widgets/themeSection';
import { RankingSection } from '@/features/productRanking/ui';

const Home = () => (
  <>
    <FriendSelector />
    <ThemeSection />
    <RankingSection />
  </>
);

export default Home;
