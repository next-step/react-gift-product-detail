import PresentCategory from "@/pages/main/components/PresentCategory";
import SelectFriendBox from "@/pages/main/components/SelectFriendBox";
import FightingBox from "@/pages/main/components/FightingBox";
import GiftsRanking from "@/pages/main/components/GiftsRanking";

const MainPage = () => {
  return (
    <>
      <SelectFriendBox />
      <PresentCategory />
      <FightingBox
        subMessage="카카오테크 캠퍼스 3기여러분"
        titleMessage="프론트엔드 2단계 과제 화이팅! 🎉"
      />
      <GiftsRanking />
    </>
  );
};

export default MainPage;
