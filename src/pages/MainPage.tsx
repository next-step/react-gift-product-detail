import CategorySection from '@/components/main/CategorySection';
import FriendSelection from '@/components/main/FriendSelection';
import DisplaySection from '@/components/main/DisplaySection';
import RankingSection from '@/components/main/RankingSection';

const MainPage = () => {
  return (
    <>
      <FriendSelection />
      <CategorySection />
      <DisplaySection />
      <RankingSection />
    </>
  );
};

export default MainPage;
