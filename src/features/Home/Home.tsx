import PromoBanner from '@features/Home/components/PromoBanner';
import RankingSection from '@features/Home/components/ranking/RankingSection';
import FreiendSelector from '@features/Home/components/FriendSelector';
import ThemeSection from '@features/Home/components/ThemeSection';

const Home = () => {
  return (
    <>
      <FreiendSelector />
      <ThemeSection />
      <PromoBanner />
      <RankingSection />
    </>
  );
};

export default Home;
