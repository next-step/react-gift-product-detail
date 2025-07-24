import { FriendSelector } from '@/features/friendSelection';
import { ThemeField } from '@/features/themeCatalog';
import { RankingSection } from '@/features/productRanking/ui';

const Home = () => (
  <>
    <FriendSelector />
    <ThemeField />
    <RankingSection />
  </>
);

export default Home;
