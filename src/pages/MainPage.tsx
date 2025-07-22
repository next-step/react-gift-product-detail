import TheHeader from "@/components/layout/TheHeader";
import PresentCategory from "@/components//main/PresentCategory";
import SelectFriendBox from "@/components/main/SelectFriendBox";
import FightingBox from "@/components/main/FightingBox";
import GiftsRanking from "@/components/main/GiftsRanking";

const MainPage = () => {
  return (
    <>
      <TheHeader />
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
